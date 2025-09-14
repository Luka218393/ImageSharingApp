import { useState } from "react";
import { IoMdMore, IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export const ImageCard: React.FC<{ username: string, imageURL: string }> = ({ username, imageURL }) => {
  return (
    <div className="w-[320px] h-fit relative">
      <img src={imageURL} className=" cursor-pointer object-cover w-[320px] h-[220px] drop-shadow-xl/20 rounded-lg z-0 "></img>
      
      <button className=" cursor-pointer absolute top-2 left-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoMdMore size="32px" />
      </button>

      <button className="cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoMdDownload size="32px" />
      </button>

      <h3 className = "ml-4 mt-2 text-lg font-semibold">
        {username}
      </h3>
    </div>
  )
}

export const ImageCard2: React.FC<{ image: File }> = ({ image }) => {
  return (
    <div className="w-[320px] h-fit relative">
      <img src={URL.createObjectURL(image)} className=" cursor-pointer object-cover w-[320px] h-[220px] drop-shadow-xl/20 rounded-lg z-0 "></img>

      <button className="cursor-pointer absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition">
        <IoClose size="32px" />
      </button>
    </div>
  )
}
