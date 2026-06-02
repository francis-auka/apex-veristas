import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/marketplace/pros/[id] — Get a single professional's full profile
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("pros")
      .select(`
        *,
        pro_credentials ( id, title, issuing_body, certificate_url, expiry_date, verification_status, created_at ),
        pro_reviews ( id, client_email, rating, comment, created_at )
      `)
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: "Professional not found" }, { status: 404 });
    }

    const ratings = (data.pro_reviews || []).map((r: any) => r.rating).filter(Boolean);
    const avgRating = ratings.length > 0
      ? Math.round((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length) * 10) / 10
      : null;

    const pro = {
      id:                  data.id,
      fullName:            data.full_name,
      title:               data.title,
      bio:                 data.bio,
      location:            data.location,
      hourlyRate:          data.hourly_rate,
      yearsOfExperience:   data.years_of_experience,
      profileImageUrl:     data.profile_image_url,
      isVerified:          data.is_verified,
      avgRating,
      reviewCount:         ratings.length,
      credentials:         (data.pro_credentials || []).map((c: any) => ({
        id:                 c.id,
        title:              c.title,
        issuingBody:        c.issuing_body,
        certificateUrl:     c.certificate_url,
        expiryDate:         c.expiry_date,
        verificationStatus: c.verification_status,
      })),
      reviews:             (data.pro_reviews || []).map((r: any) => ({
        id:          r.id,
        clientEmail: r.client_email,
        rating:      r.rating,
        comment:     r.comment,
        createdAt:   r.created_at,
      })),
      createdAt: data.created_at,
    };

    return NextResponse.json({ success: true, data: pro });
  } catch (err: any) {
    console.error("[marketplace/pros/[id] GET]", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
