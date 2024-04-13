import { notFound } from "next/navigation";
import { getImage } from "@/lib/image"


export async function GET(req: Request, { params }: { params: { image: string } }) {
  const { data } = await getImage(params.image)
  if (!data)
    return notFound()

  return new Response(Buffer.from(data, "base64"), {
    headers: {
      'Content-Type': 'image/png',
    }
  })

}
