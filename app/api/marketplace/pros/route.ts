import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/marketplace/pros — List all verified professionals
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search   = searchParams.get("search")   || "";
    const industry = searchParams.get("industry")  || "";
    const verified = searchParams.get("verified")  || "true";

    let query = supabase
      .from("pros")
      .select(`
        *,
        pro_credentials ( id, title, issuing_body, verification_status ),
        pro_reviews ( rating )
      `)
      .order("created_at", { ascending: false });

    if (verified === "true") {
      query = query.eq("is_verified", true);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,title.ilike.%${search}%,location.ilike.%${search}%`);
    }

    // Note: industry filtering would require adding an industry column to pros table
    // For now we filter by title which often contains industry info

    const { data, error } = await query;

    if (error) {
      console.error("[marketplace/pros GET]", error);
      return NextResponse.json({ success: false, error: "Failed to fetch professionals" }, { status: 500 });
    }

    // Calculate average rating for each professional
    const pros = (data || []).map((pro: any) => {
      const ratings = (pro.pro_reviews || []).map((r: any) => r.rating).filter(Boolean);
      const avgRating = ratings.length > 0
        ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
        : null;

      return {
        id:                  pro.id,
        fullName:            pro.full_name,
        title:               pro.title,
        bio:                 pro.bio,
        location:            pro.location,
        hourlyRate:          pro.hourly_rate,
        yearsOfExperience:   pro.years_of_experience,
        profileImageUrl:     pro.profile_image_url,
        isVerified:          pro.is_verified,
        avgRating,
        reviewCount:         ratings.length,
        credentialCount:     (pro.pro_credentials || []).length,
        verifiedCredentials: (pro.pro_credentials || []).filter((c: any) => c.verification_status === "verified").length,
        createdAt:           pro.created_at,
      };
    });

    return NextResponse.json({ success: true, data: pros });
  } catch (err: any) {
    console.error("[marketplace/pros GET]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
