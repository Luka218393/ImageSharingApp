import React, { useState, useEffect } from 'react'
import { ImageCard } from './components/ImageCard'
import { AddImageDialog } from './dialoges/AddImageDialog.tsx';
//@ts-ignore
import { ImageContext } from '../models/imageContext.ts';
import { ImagePreview } from './components/ImagePreview.tsx';
import { FloatingButtons } from './components/FloatingButtons.tsx';


/* 
Page where images of a gallery are displayed
*/
export const GalleryPage: React.FC<{galleryId: string, username: string}> = ({galleryId, username}) => {

    let [previewOfImage, setPreviewOfImage] = useState<string | null>(null)
    let [imageUploadDialog, setImageUploadDialog] = useState(false)
    let [images, setImages] = useState<ImageContext[]>()

    function ImageUploadDialogTrigger() { setImageUploadDialog(!imageUploadDialog) }
    function ImagePreviewTrigger(imageURL: string | null) { setPreviewOfImage(imageURL) }

    //Fetch image and thumbnail URLs from the backend & convert to object
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/gallery/${galleryId}/`,
            {
                method: "GET",
            }
        ).then(response => response.json())
            .then(data => setImages(data.reverse()))
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
                previewOfImage != null &&
                (
                    <ImagePreview imageURL={previewOfImage!} ImagePreviewTrigger={ImagePreviewTrigger} />
                )
            }
            <div className=' py-12 flex justify-center w-fill'>
                <div className=" w-fit h-fit grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-1">
                    {
                         images?.map(image =>// just pass the image
                            <ImageCard key = {image.image_url} imageContext = {image} username={image.creator_name} previewImage={ImagePreviewTrigger} />
                        )
                    }
                    <FloatingButtons ImageUploadDialogTrigger={ImageUploadDialogTrigger} galleryId={galleryId} />
                </div>
            </div>
        </>
    )
}
