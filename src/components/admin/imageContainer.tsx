"use client";

import { Image } from "@/lib/db/schema";
import { useState } from "react";
import { getImagesByCursor } from "@/app/actions";
import SingleImage from "@/components/admin/singleImage";
import { deleteImage } from "@/app/actions";

export default function ImageContainer({ images, lastPage }: { images: Image[], lastPage?: boolean }) {
  if (images.length == 0) return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-50 p-5 border rounded shadow-lg">No images</div>
    </div>
  );

  const [imageList, setImageList] = useState<Image[]>(images);
  const [cursor, setCursor] = useState(images[images.length - 1].id);
  const [isLastPage, setIsLastPage] = useState(lastPage ?? false)

  const getNewImages = () => {
    getImagesByCursor(cursor).then((res) => {
      setImageList([...imageList, ...res.data])
      setCursor(res.data[res.data.length - 1].id)
      setIsLastPage(res.page.lastPage == res.page.currentPage)
    })
  }

  const requestDeleteImage = async (id: number) => {
    deleteImage(id)
    setImageList(imageList.filter((d) => d.id !== id))
  }

  return <div className="p-4">
    <div className="grid grid-cols-1 gap-4 max-w-[1500px] m-auto sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {imageList.map((d, i) => <SingleImage key={i} image={d} deleteImage={() => requestDeleteImage(d.id)} />)}
    </div>
    {!isLastPage &&
      <button onClick={getNewImages} className="block mx-auto mt-4 p-2 bg-blue-500 text-white rounded">Load More</button>
    }
  </div>
}
