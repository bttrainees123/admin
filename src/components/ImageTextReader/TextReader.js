import React, { useRef, useState } from 'react'
import Tesseract from "tesseract.js";
import uploadIcon from '../image/upload.png'
import clearIcon from '../image/clear.png'


const TextReader = () => {
    const inputRef = useRef(null);
    const [hasImage, setHasImage] = useState(false)
    const [message, setMessage] = useState("");

    const handleFile = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    }

    const handleClear = () => {
        setHasImage(false);
        setMessage("");
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setHasImage(true);
        recognizeText(newFile);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(newFile);
    }

    const recognizeText = async (imageFile) => {
        setMessage("Identifying text...")
        const response = await Tesseract.recognize(imageFile, "eng")
        const { data } = response;
        setMessage("Text Identified Successfully")
        console.log("Data ", data);
        console.log("Text Data ", data.text);
    }


    return (
        <>
            <div className='image-container' style={{border: '2px solid black', width: '154px', marginLeft: '45%', marginTop: '200px'}}>
                {!hasImage ? (<div className='upload-container' onClick={handleFile}>
                    <input style={{ display: 'none' }} ref={inputRef} type='file' accept='image/*' onChange={handleFileChange} />
                    <img className='upload-icon' src={uploadIcon} />
                    <div>Select Image</div>
                </div>
                ) : (
                    <div className=''  >
                        <img className='close-icon' src={clearIcon} onClick={handleClear} />
                    </div>
                )}
            </div>
            <div className="message" style={{marginLeft: '45%', marginTop: '10px'}}>{message}</div>
        </>
    )
}

export default TextReader