import { useState } from "react";

const FileUpload = ({ handleSelectedImage }) => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      handleSelectedImage(e);
    }
  };

  return (
    <div className="mb-3 w-full">
      <input type="file" id="profile_picture" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
      <label htmlFor="profile_picture" className="block w-full cursor-pointer rounded-lg border border-gray-400 px-4 py-3 text-center text-sm leading-tight text-white focus:outline-none dark:bg-neutral-700 hover:dark:bg-neutral-600">
        {fileName ? fileName : "Choose File"}
      </label>
    </div>
  );
};

export default FileUpload;
