import React, { useState, useEffect } from 'react'
import { ImageCard } from './components/ImageCard'
import { AddImageDialog } from './dialoges/AddImageDialog';
//@ts-ignore
import { ImageWithContext } from '../models/imageContext.ts';
import { ImagePreview } from './components/ImagePreview.tsx';
import { FloatingButtons } from './components/FloatingButtons.tsx';

export const GalleryPage: React.FC = () => {

    //let gallery = new Gallery(null, "123" )// make user chose the gallery to view

    let [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null)
    let [imageUploadDialog, setImageUploadDialog] = useState(false)
    let [images, setImages] = useState<ImageWithContext[]>()
    let [imageSelection, setImageSelection] = useState<string[]>([])
    let [username, setUsername] = useState<string>("The Annihilator of Worlds")
    let [galleryId, setGalleryId] = useState<string>("b692b01c-8f3f-4c8d-94d6-557d6b75031e")


    function ImageUploadDialogTrigger() { setImageUploadDialog(!imageUploadDialog) }
    function ImagePreviewTrigger(imageURL: string | null) { setImagePreviewURL(imageURL) }
    function ToggleImageFromSelection(imageURL: string) {
        if (imageURL in imageSelection) {
            setImageSelection(imageSelection.filter(link => link !== imageURL))
        }
        else{
           imageSelection.push(imageURL)
           setImageSelection(imageSelection)
        }
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/gallery/${galleryId}`,
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
                    <AddImageDialog ImageUploadDialogTrigger={ImageUploadDialogTrigger} username = {username} gallery_id={galleryId} />
                )
            }
            {
                imagePreviewURL != null &&
                (
                    <ImagePreview imageURL={imagePreviewURL!} ImagePreviewTrigger={ImagePreviewTrigger} />
                )
            }
            <div className=' py-12 flex justify-center w-fill'>
                <div className=" w-fit h-fit grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                    {
                        images?.map(image =>
                            <ImageCard username={image.creator_name} imageURL={image.image_url} previewImage={ImagePreviewTrigger} selectImage = {ToggleImageFromSelection} />
                        )
                    }
                    <FloatingButtons ImageUploadDialogTrigger={ImageUploadDialogTrigger} />
                </div>
            </div>
        </>
    )
}
