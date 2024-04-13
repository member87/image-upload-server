import { db } from "@/lib/db/connect";
import { images } from "@/lib/db/schema";
import { eq } from 'drizzle-orm';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import client from "@/lib/s3client";
import { notFound } from "next/navigation";

export const getImage = async (url: string) => {

  const image = await db.select().from(images).where(
    eq(images.url, url)
  ).limit(1)

  if (image.length === 0 || !image[0].key) {
    notFound()
  }

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Key: image[0].key
  });

  const resp = await client.send(command)
  return { data: await resp.Body?.transformToString(), image: image[0] }
}
