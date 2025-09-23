import { useEffect, useState } from "react";
import { IoMdMore, IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { downloadFile } from "../Functions"
import type { ImageContext } from "../../models/imageContext";


/*
Conponents that display image 
*/
export const ImageCard: React.FC<{ imageContext: ImageContext, username: string, previewImage: (imageURL: string) => void }> = ({imageContext, username, previewImage }) => {

  let [dropdownVisibility, setDropdownVisibility] = useState<Boolean>(false)
  function dropdownVisibilityTrigger() { setDropdownVisibility(!dropdownVisibility) }


  function deleteImage() {
    fetch(
      `http://127.0.0.1:8000/delete/image/${imageContext.id}/`,
      {
        method:"DELETE"
      }
    )
  }

  return (

    <div className="w-[320px] h-fit relative">
      <img src={imageContext.thumbnail_url} className=" cursor-pointer object-cover w-[320px] h-[240px] drop-shadow-xl/20 rounded-lg z-0 " onClick={() => previewImage(imageContext.image_url)}></img>
      <div className="bg-amber-700">
        <button onClick={dropdownVisibilityTrigger} className=" cursor-pointer absolute top-2 left-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
          <IoMdMore size="32px" />
        </button>
        {dropdownVisibility &&
          (
            <div className="bg-black/45 absolute top-15 left-2 text-white p-2 rounded-md font-medium flex flex-col">
              <button onClick={deleteImage} className="text-red-500 cursor-pointer hover:underline">Delete</button>
            </div>
          )
        }
      </div>
      <button onClick={() => downloadFile(imageContext.image_url, username)} className="cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoMdDownload size="32px" />
      </button>
      <div className="flex flex-row w-fill px-6 py-2 justify-between">
        <h4 className="text-lg font-semibold">
          {username}
        </h4>
        <div className="text-purple-600 text-lg">
          New
        </div>
      </div>
    </div>
  )
}

export const ImageCard2: React.FC<{ image: File, removeImage: (name: string) => void }> = ({ image, removeImage }) => {

  return (

    <div className="w-[320px] h-fit relative">
      <img src={URL.createObjectURL(image)} loading="lazy" className=" cursor-pointer object-cover w-[320px] h-[240px] drop-shadow-xl/20 rounded-lg z-0 "></img>

      <button onClick={() => removeImage(image.name)} className=" text-white cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full tex</div>t-white hover:bg-black/70 transition">
        <IoClose size="32px" />
      </button>
    </div>
  )
}
