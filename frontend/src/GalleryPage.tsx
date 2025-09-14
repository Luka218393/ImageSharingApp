import React, { useState, useEffect } from 'react'
import { ImageCard } from './components/ImageCard'
import { ImageUploadButton } from './components/ImageUploadButton'
import { AddImageDialog } from './dialoges/AddImageDialog';
import { Gallery } from '../models/gallery'
import axios from "axios"
//@ts-ignore
import { ImageWithContext } from '../models/imageContext.ts';


export const GalleryPage: React.FC = () => {

    //let gallery = new Gallery(null, "123" )// make user chose the gallery to view

    let [imageUploadDialog, setImageUploadDialog] = useState(false)
    let [images, setImages] = useState<ImageWithContext[]>()

    function ImageUploadDialogTrigger() { setImageUploadDialog(!imageUploadDialog); console.log(imageUploadDialog) }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/gallery/b692b01c-8f3f-4c8d-94d6-557d6b75031e",
            {
                method: "GET",
            }
        ).then(response => response.json())
            .then(data => { let a = data.map((element: any) => ImageWithContext.fromJSON(element)); console.log(a); return a })
            .then(data => setImages(data))
    }, []);

    return (
        <>
            {
                imageUploadDialog &&
                (
                    <AddImageDialog ImageUploadDialogTrigger={ImageUploadDialogTrigger} />
                )
            }
            <div className=' py-12  flex justify-center w-window'>
                <div className=" w-fit h-fit grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                    {
                        images?.map(image =>
                            <ImageCard username={image.creator_name} imageURL={image.image_url} />
                        )
                    }
                    <ImageUploadButton ImageUploadDialogTrigger={ImageUploadDialogTrigger} />
                </div>
            </div>
        </>
    )
}
