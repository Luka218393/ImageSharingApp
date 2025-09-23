import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { ImageCard2 } from './../components/ImageCard'
import { GrLinkNext } from "react-icons/gr";
import { FiPlus } from "react-icons/fi"



/*
A dialog that allows user to select, check and upload images to the server
*/
export const AddImageDialog: React.FC<{ ImageUploadDialogTrigger: () => void, username: string, gallery_id: string }> = ({ ImageUploadDialogTrigger, username, gallery_id }) => {

    const disableParentOnClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const [images, setImages] = useState<File[]>([]);

    //Adds images to state
    //Creates thumbnails for the images in the background
    const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            const images = Array.from(event.target.files);
            setImages((prev) => [...prev, ...images])

        }
    };

    function removeImage(name: string) {
        let temp = images.filter(image => image.name != name)
        setImages(temp)
    }

    const postImages = () => {
        images.forEach(
            async image => {
                let formData = new FormData()
                formData.append("image", image)
                formData.append("creator_name", username)
                formData.append("gallery_id", gallery_id)
                try {
                    let response = await fetch("http://127.0.0.1:8000/image/",
                        {
                            method: "POST",
                            body: formData
                        }
                    )
                    console.log(await response.json())//Add confirmation dialog
                }
                catch (e) { console.error(e) }
            }
        )
    }

    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-center overflow-y-auto py-10"
                style={{ overscrollBehaviorY: "contain" }}
                onClick={ImageUploadDialogTrigger}
            >
                <div
                    className="flex flex-col w-fit max-h-[80vh] bg-white rounded-[32px] p-6 gap-4 z-[10000] overflow-y-auto"
                    onClick={disableParentOnClick}
                >
                    <div className="w-fit h-fit grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                        {
                            images.map(
                                (image) => (<ImageCard2 key={image.name} image={ image} removeImage={removeImage} />)
                            )
                        }
                    </div>
                    <div className='w-fill h-fit flex flex-row-reverse text-white justify-between'>
                        <GrLinkNext className='cursor-pointer bg-purple-800 p-2 rounded-[10px]' size="64px" onClick={postImages} />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={uploadImages}
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
        </>
    )
}
