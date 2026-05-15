import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "af-south-1",
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME!;

export interface UploadResult {
  fileUrl: string;
  s3Key:   string;
}

/**
 * Upload a Buffer/Blob to S3, returns the public URL and key.
 * @param file       - Buffer or Uint8Array of the file content
 * @param folder     - S3 folder prefix, e.g. "documents", "reports"
 * @param fileName   - Original file name (used for extension)
 * @param mimeType   - MIME type of the file
 */
export async function uploadToS3(
  file: Buffer,
  folder: string,
  fileName: string,
  mimeType: string
): Promise<UploadResult> {
  const ext   = fileName.split(".").pop() ?? "bin";
  const key   = `${folder}/${uuidv4()}.${ext}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket:      BUCKET,
      Key:         key,
      Body:        file,
      ContentType: mimeType,
    })
  );

  const fileUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return { fileUrl, s3Key: key };
}

/**
 * Delete an object from S3 by key.
 */
export async function deleteFromS3(s3Key: string): Promise<void> {
  await s3Client.send(
    new DeleteObjectCommand({ Bucket: BUCKET, Key: s3Key })
  );
}

/**
 * Generate a pre-signed URL for private file download (valid 1 hour).
 */
export async function getPresignedUrl(s3Key: string, expiresInSeconds = 3600): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: s3Key });
  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

export { s3Client, BUCKET };
