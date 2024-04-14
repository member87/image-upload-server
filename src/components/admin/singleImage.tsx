import { Image } from "@/lib/db/schema";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function SingleImage({ image, deleteImage }: { image: Image, deleteImage: (id: number) => void }) {
  const [modal, setModal] = useState(false)


  return <div className="rounded shadow aspect-square overflow-hidden">
    <button onClick={() => setModal(true)} className="w-full h-full">
      <img src={`/api/v1/image/${image.url}/`} className="w-full h-full object-cover" />
    </button>
    {modal && createPortal(<div className="fixed inset-0 bg-black bg-opacity-50 z-50 p-5">
      <div className="bg-white w-full h-full box-border shadow-lg rounded overflow-hidden">
        <div className="flex h-full">
          <div className="flex-1 h-full justify-center items-center p-5">
            <img src={`/api/v1/image/${image.url}/`} className="max-w-full max-h-full border shadow" />
          </div>
          <div className="min-w-96 p-2">
            <div className="flex justify-end">
              <button onClick={() => setModal(false)} className="w-7 h-7 bg-slate-800 rounded-full text-white">X</button>
            </div>
            <div className="">
              <div>
                <span className="font-bold">Created</span>
                <p className="text-sm">{new Date(image.createdAt).toLocaleDateString()} {new Date(image.createdAt).toLocaleTimeString()}</p>
              </div>
              <div>
                <span className="font-bold">Last Edited</span>
                <p className="text-sm">{new Date(image.updatedAt).toLocaleDateString()} {new Date(image.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
            <button className="bg-red-500 px-4 py-2 mt-2 rounded text-white" type="submit" onClick={() => {
              deleteImage(image.id)
              setModal(false)
            }}
            >Delete</button>

          </div>
        </div>
      </div>
    </div>, document.body)}
  </div>
}
