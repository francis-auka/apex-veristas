import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User    from "@/models/User";
import Company from "@/models/Company";
import { supabase } from "@/lib/supabase";
import { apiSuccess, apiError, slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, password,
      registerType = "client",
      // Client fields
      companyName, country, industry,
      // Professional fields
      title, bio, location,
    } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(apiError("Name, email, and password are required"), { status: 400 });
    }

    if (registerType === "client" && (!companyName || !country)) {
      return NextResponse.json(apiError("Company name and country are required"), { status: 400 });
    }

    if (registerType === "professional" && !title) {
      return NextResponse.json(apiError("Professional title is required"), { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return NextResponse.json(apiError("Email already registered"), { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);

    if (registerType === "professional") {
      // ── Professional Flow ──
      // 1. Create the Mongo user with role "professional"
      const user = await User.create({
        firstName,
        lastName,
        email:           email.toLowerCase(),
        passwordHash:    hashedPassword,
        role:            "professional",
        company:         null,
        isEmailVerified: false,
      });

      // 2. Create the Supabase profile
      const { error: sbError } = await supabase.from("pros").insert({
        user_email:          email.toLowerCase(),
        full_name:           `${firstName} ${lastName}`,
        title:               title || "HSEQ Professional",
        bio:                 bio || null,
        location:            location || null,
        years_of_experience: null,
        hourly_rate:         null,
        is_verified:         false,
      });

      if (sbError) {
        console.error("[register] Supabase insert error:", sbError);
        // Don't fail the whole registration — the user can complete their profile later
      }

      return NextResponse.json(
        apiSuccess({ userId: user._id.toString(), type: "professional" }),
        { status: 201 }
      );
    }

    // ── Client Flow (existing) ──
    const company = await Company.create({
      name:         companyName,
      slug:         slugify(companyName),
      contactEmail: email.toLowerCase(),
      country,
      industry:     industry || "General",
      status:       "trial",
    });

    const user = await User.create({
      firstName,
      lastName,
      email:           email.toLowerCase(),
      passwordHash:    hashedPassword,
      role:            "client_admin",
      company:         company._id,
      isEmailVerified: false,
    });

    return NextResponse.json(
      apiSuccess({ userId: user._id.toString(), companyId: company._id.toString(), type: "client" }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[register POST]", err);
    return NextResponse.json(apiError("Registration failed"), { status: 500 });
  }
}
