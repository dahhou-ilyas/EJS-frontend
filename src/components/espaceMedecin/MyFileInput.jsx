"use client";
import React, { useState } from "react";
import Image from "next/image";
import pdfIcon from "@assets/img/icons/pdf-icon.png";
import docIcon from "@assets/img/icons/doc-icon.png";
import removeIcon from "@assets/img/icons/remove-icon.png";

const MyFileInput = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInput = (event) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return;
    }

    const validFiles = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (
        file.type.match("image/*") ||
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        validFiles.push(file);
      } else {
        alert(`File "${file.name}" is not a supported type.`);
      }
    }
    setSelectedFiles([...selectedFiles, ...new Set(validFiles)]);
  };
  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const renderPreviews = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="file-preview">
        {file.type.match("image/*") ? (
          <Image
            src={URL.createObjectURL(file)}
            alt={`Preview of ${file.name}`}
            objectFit="cover"
            width={130}
            height={130}
          />
        ) : (
          <div className="file-link">
            <Image
              src={file.type === "application/pdf" ? pdfIcon : docIcon}
              alt="File icon"
              width={file.type === "application/pdf" ? 35 : 52}
              height={file.type === "application/pdf" ? 47 : 47}
            />
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.name}
            </a>
          </div>
        )}
        <button
          className="remove-button"
          onClick={() => handleRemoveFile(index)}
        >
          <Image src={removeIcon} alt="Remove file" width={20} height={20} />
        </button>
      </div>
    ));
  };

  return (
    <div className="col-md-10 mx-auto">
      <label className="col-form-label col-md-2">File input</label>
      <div className="form-group row">
        <div className="custom-width-11-5">
          <input
            className="form-control"
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileInput}
          />
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div className="preview-container">{renderPreviews()}</div>
      )}
    </div>
  );
};

export default MyFileInput;
