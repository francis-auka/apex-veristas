import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User    from "@/models/User";
import Company from "@/models/Company";
import { apiSuccess, apiError, slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, companyName, country, industry } = await req.json();

    if (!firstName || !lastName || !email || !password || !companyName || !country) {
      return NextResponse.json(apiError("All fields are required"), { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return NextResponse.json(apiError("Email already registered"), { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create company
    const company = await Company.create({
      name:         companyName,
      slug:         slugify(companyName),
      contactEmail: email.toLowerCase(),
      country,
      industry:     industry || "General",
      status:       "trial",
    });

    // Create user
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
      apiSuccess({ userId: user._id.toString(), companyId: company._id.toString() }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[register POST]", err);
    return NextResponse.json(apiError("Registration failed"), { status: 500 });
  }
}
