import React, { useState } from "react";
import { api } from "../service/axios";

const FileInput = (params: {
  filePath?: string;
  setFileUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { filePath = "uploads", setFileUrl } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = React.createRef<HTMLInputElement>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filePath", filePath);
      const fileName = file.name.split(".")[0] + "_" + new Date().getTime();
      formData.append("fileName", fileName);

      try {
        const response = await api.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFileUrl(response.data.filePath); // Assuming server responds with { filePath: 'url/path' }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(`Error uploading file: ${error}`);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setFileUrl("");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isLoading}
        ref={inputRef}
      />
      {isLoading && "Uploading..."}
    </div>
  );
};

export default FileInput;
