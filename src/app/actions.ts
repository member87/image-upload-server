"use server";

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from "@/lib/db/connect";
import { images } from "@/lib/db/schema";
import { count, desc, lt, eq } from "drizzle-orm";
import * as jose from 'jose'
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import client from "@/lib/s3client";

export async function loginUser(prevState: any, formData: FormData) {

  if (formData.get('password') !== process.env.API_KEY) {
    return { error: 'Invalid password' }
  }

  const c = cookies();

  const secret = new TextEncoder().encode(process.env.API_KEY);
  const token = await new jose.SignJWT({ loggedIn: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret);
  c.set('token', token)
  redirect('/admin/dashboard')
}

export async function deleteImage(imageId: number) {

  if (imageId === undefined) {
    return { error: 'Image id not provided' }
  }

  const image = await db.select().from(images).where(eq(images.id, imageId))
  if (image.length === 0) {
    return { error: 'Image not found' }
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: image[0].key
  })

  try {
    await client.send(command);
    await db.delete(images).where(eq(images.id, imageId))
    return { success: 'Image deleted' }
  } catch (err) {
    console.error("Error", err);
    return { error: 'Error deleting image' }
  }
}



export async function getImagesByCursor(cursor?: number, pageSize = 15) {
  const total: number = (await db.select({ count: count() }).from(images))[0].count;

  return {
    data: await db.select()
      .from(images)
      .where(cursor ? lt(images.id, cursor) : undefined)
      .limit(pageSize)
      .orderBy(desc(images.id)),
    page: {
      total,
      cursor,
      lastPage: Math.ceil(total / pageSize),
      currentPage: cursor ? Math.ceil(((total - cursor) + 1) / pageSize + 1) : 1
    }
  }
}

