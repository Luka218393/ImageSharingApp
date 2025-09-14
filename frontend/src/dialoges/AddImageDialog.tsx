import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { ImageCard2 } from '../components/ImageCard'
import { GrLinkNext } from "react-icons/gr";
import { FiPlus } from "react-icons/fi"

export const AddImageDialog: React.FC<{ ImageUploadDialogTrigger: () => void }> = ({ ImageUploadDialogTrigger }) => {

    const handleChildClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setImages((prev) => [...prev, ...files]);
        }
    };



    const postImages = () => {
        images.forEach(
            async image => {
                let formData = new FormData()
                formData.append("image", image)
                formData.append("creator_name", "Nomen Nescio")
                formData.append("gallery_id", "b692b01c-8f3f-4c8d-94d6-557d6b75031e")
                try {
                    let response = await fetch("http://127.0.0.1:8000/image/",
                        {
                            method: "POST",
                            body: formData
                        }
                    )
                    console.log(response.json())
                }
                catch (e) { console.error(e) }
            }
        )
    }

    return (
        <div className="bg-black/35 w-screen h-screen absolute z-100 flex justify-center items-center fixed" onClick={ImageUploadDialogTrigger}>
            <div className="flex flex-col w-fit bg-white rounded-[32px] p-6 gap-4" onClick={handleChildClick}>
                <div className=" w-fit h-fit grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                    {
                        images.map(
                            image => (<ImageCard2 image={image} />)
                        )
                    }

                </div>
                <div className='w-fill h-fit flex flex-row-reverse text-white justify-between'>
                    <GrLinkNext className='cursor-pointer bg-purple-800 p-2 rounded-[10px]' size="64px" onClick={postImages} />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-purple-300"
                        style={{ display: "none" }}
                        id="imageInput"
                    />
                    <label htmlFor="imageInput">
                        <FiPlus className='cursor-pointer bg-purple-800 p-2 rounded-[10px]' size="64px" />
                    </label>
                </div>
            </div>
        </div>
    )
}
