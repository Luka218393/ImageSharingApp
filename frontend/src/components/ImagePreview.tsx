

export const ImagePreview: React.FC<{ imageURL: string, ImagePreviewTrigger: (imageURL: string | null) => void }> = ({ imageURL, ImagePreviewTrigger }) => {

    return (
       <div onClick = {() => ImagePreviewTrigger(null)} className="fixed inset-0 z-60 flex items-center justify-center bg-black/90">
            <img
                src={imageURL}
                alt={"preview"}
                className="max-w-full max-h-full object-contain p-10"
            />
        </div>//Add magnifying glass
    )
}