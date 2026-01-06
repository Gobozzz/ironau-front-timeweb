import React, { useRef, ChangeEvent } from "react";
import Image from "next/image";
import GalleryIcon from "@/public/icons/gallery.svg";

type FilePickerButtonProps = {
  onFileSelected: (files: File[]) => void; // Массив выбранных файлов, пустой если ничего не выбрано
  accept?: string;
  multiple?: boolean;
};

const FilePickerButton: React.FC<FilePickerButtonProps> = ({
  onFileSelected,
  accept,
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelected(Array.from(files));
    } else {
      onFileSelected([]);
    }
    event.target.value = "";
  };

  return (
    <>
      <button className="w-11 h-11 rounded-lg bg-white! flex! items-center justify-center" type="button" onClick={handleButtonClick}>
        <Image src={GalleryIcon} alt="Галерея" />
      </button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
    </>
  );
};

export default FilePickerButton;
