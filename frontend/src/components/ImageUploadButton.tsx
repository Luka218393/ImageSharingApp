import {FiPlus} from "react-icons/fi"
export const ImageUploadButton: React.FC<{ImageUploadDialogTrigger: ()=>void}> = ({ImageUploadDialogTrigger}) => {
  return (
    <button
      type="button"
      onClick={ImageUploadDialogTrigger}
      className={
        `cursor-pointer fixed z-50 bottom-10 right-10 flex items-center justify-center rounded-lg shadow-2xl transition-transform transform hover:scale-105 bg-purple-800 text-white `
      }
    >
        <FiPlus size = "8rem"/>
    </button>
  );
}
