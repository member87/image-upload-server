import { notFound } from "next/navigation";
import { getImage } from "@/lib/image";
import { Viewport } from "next";


export async function generateMetadata({ params }: { params: { image: string } }) {
  const { image } = await getImage(params.image)

  return {
    openGraph: {
      images: process.env.APP_URL + '/api/v1/image/' + image.url
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
}


export default async function Page({ params }: { params: { image: string } }) {

  const { data, image } = await getImage(params.image)

  if (!image) {
    return notFound()
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="p-5">
          <div className="text-lg mb-3">
            <span className="font-bold">Created</span>
            <p className="text-sm">{image.createdAt.toLocaleDateString()} {image.createdAt.toLocaleTimeString()}</p>
          </div>
          <div className="max-w-[70rem] flex justify-center">
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src={`data:image/png;base64,${data}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
