import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToS3 } from "@/lib/s3";
import { apiSuccess, apiError, ALLOWED_MIME_TYPES, MAX_FILE_SIZE_MB } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const formData = await req.formData();
    const file     = formData.get("file") as File | null;
    const folder   = (formData.get("folder") as string) ?? "documents";

    if (!file) {
      return NextResponse.json(apiError("No file provided"), { status: 400 });
    }

    // Validate file size
    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        apiError(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`),
        { status: 413 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        apiError(`File type not allowed: ${file.type}`),
        { status: 415 }
      );
    }

    const buffer   = Buffer.from(await file.arrayBuffer());
    const result   = await uploadToS3(buffer, folder, file.name, file.type);

    return NextResponse.json(
      apiSuccess({
        fileUrl:  result.fileUrl,
        s3Key:    result.s3Key,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[upload POST]", err);
    return NextResponse.json(apiError("Upload failed"), { status: 500 });
  }
}


