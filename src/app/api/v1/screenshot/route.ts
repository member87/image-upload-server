import { db } from "@/lib/db/connect";
import { images } from "@/lib/db/schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createHash } from "crypto";
import { headers } from 'next/headers'
import client from "@/lib/s3client";

export async function POST(req: Request) {

  try {
    const { input, key } = await req.json()

    if (!input || !key) {
      return Response.json({ message: "Incorrect Input" }, { status: 422 })
    }

    if (key !== process.env.API_KEY) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }


    const fileName = `${Date.now()}.png`

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: input,
      ContentType: "image/png",
    });

    await client.send(command);

    const url = createHash("sha256").update(fileName + process.env.API_KEY).digest("hex")

    await db.insert(images).values({
      key: fileName,
      url: url
    })

    return Response.json({ url: `${process.env.APP_URL}/view/${url}` })
  } catch (e) {
    console.error(e)
    return Response.json({ message: "error" })
  }
}
