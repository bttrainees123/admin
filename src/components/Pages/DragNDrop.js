import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";

const DragNDrop = ({
  onFilesSelected,
  width,
  height,
}) => {

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    console.log(files);


    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);


  return (
    <>
      <section className="drag-drop" style={{ width: width, height: height }}>
        <div
          className={`document-uploader ${files.length > 0 ? "upload-box active" : "upload-box"
            }`}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <>
            <div className="upload-info">
              <AiOutlineCloudUpload />
            </div>
            <input
              type="file"
              hidden
              id="browse"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <label htmlFor="browse" className="browse-btn">
              <div style={{ backgroundColor: 'yellow' }}>Browse files</div>
            </label>
          </>

          {files.length > 0 && (
            <div className="file-list">
              <div className="file-list__container">
                {files.map((file, index) => (
                  <div className="file-item" key={index}>
                    <div className="file-info">
                      <p>{file.name}</p>
                      <img src={file} alt='' />
                    </div>
                    <div className="file-actions">
                      <MdClear onClick={() => handleRemoveFile(index)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <div className="success-file">
              <AiOutlineCheckCircle
                style={{ color: "#6DC24B", marginRight: 1 }}
              />
              <p>{files.length} file(s) selected</p>
            </div>
          )}
        </div>
      </section>
    </>

  )
}

export default DragNDrop



