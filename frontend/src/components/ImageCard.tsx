import { useState } from "react";
import { IoMdMore, IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export const ImageCard: React.FC<{ username: string, imageURL: string, previewImage: (imageURL: string) => void, selectImage: (imageURL: string) => void }> = ({ username, imageURL, previewImage, selectImage }) => {

  let [dropdownVisibility, setDropdownVisibility] = useState<Boolean>(false)
  function DropdownVisibilityTrigger() { setDropdownVisibility(!dropdownVisibility); console.log(dropdownVisibility) }

  function DeleteImage() {
    //TODO
  }

  function DownloadImage() {
    //TODO
  }

  return (
    <div className="w-[320px] h-fit relative">
      <img src={imageURL} className=" cursor-pointer object-cover w-[320px] h-[220px] drop-shadow-xl/20 rounded-lg z-0 " onClick={() => previewImage(imageURL)}></img>
      <div className="bg-amber-700">
        <button onClick={DropdownVisibilityTrigger} className=" cursor-pointer absolute top-2 left-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
          <IoMdMore size="32px" />
        </button>
        {dropdownVisibility &&
          (
            <div className="bg-black/45 absolute top-15 left-2 text-white p-2 rounded-md font-medium flex flex-col">
              <button onClick={DeleteImage} className="text-red-500 cursor-pointer hover:underline">Delete</button>
            </div>
          )
        }
      </div>
      <button onClick={DownloadImage} className="cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoMdDownload size="32px" />
      </button>
      <div className = "flex flex-row w-fill px-6 py-2 justify-between">
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
      <img src={URL.createObjectURL(image)} className=" cursor-pointer object-cover w-[320px] h-[220px] drop-shadow-xl/20 rounded-lg z-0 "></img>

      <button onClick = {() => removeImage(image.name)}className="cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoClose size="32px" />
      </button>
    </div>
  )
}
