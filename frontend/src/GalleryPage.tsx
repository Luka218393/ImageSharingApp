import React, { useState, useEffect } from 'react'
import { ImageCard } from './components/ImageCard'
import { ImageUploadButton } from './components/ImageUploadButton'
import { AddImageDialog } from './dialoges/AddImageDialog';
import { Gallery } from '../models/gallery'
import axios from "axios"

async function fetchImages() {
    let response = await fetch("http://127.0.0.1:8000/image/1",
        {
            method: "GET",
        }
    )
    return await response.json()
}


export const GalleryPage: React.FC = () => {

    //let gallery = new Gallery(null, "123" )// make user chose the gallery to view

    let [imageUploadDialog, setImageUploadDialog] = useState(false)
    let [images, setImages] = useState<string[]>()

    function ImageUploadDialogTrigger() { setImageUploadDialog(!imageUploadDialog); console.log(imageUploadDialog) }

    useEffect( () => {
    fetch("http://127.0.0.1:8000/image/1",
        {
            method: "GET",
        }
    ).then(response => response.json())
    .then(data => setImages(data))
    console.log(images)
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
                <ImageCard username="Pokemoni" imageURL="http://127.0.0.1:8000/media/gallery1/IMG_20240509_210035.jpg" />
                <ImageCard username="Pokemoni" imageURL="../media/jennifer-marquez-9AsoK4GgBVk-unsplash.png" />
                <ImageCard username="Pokemoni" imageURL="../media/Brane.png" />
                {
                    images && 
                    (
                        <ImageCard username = "Nebitno" imageURL={images[0]}/>
                    )
                }
                <ImageUploadButton ImageUploadDialogTrigger={ImageUploadDialogTrigger} />
            </div>
        </div>
    </>
)
}
