import React, { useEffect, useRef, useState } from 'react'
import Tesseract from "tesseract.js";
import uploadIcon from '../image/upload.png'
import clearIcon from '../image/clear.png'
import { chain, difference } from "lodash";
import Webcam from "react-webcam";

const VALID_WORDS = ['lil', 'reds', 'takeout', 'and', 'c', 'oxtail', 'gravy', 'subtotal', 'taxes', 'tip', 'discount', 'total']

const TextReader = () => {
    const webcamRef = useRef(null);
    const inputRef = useRef(null);
    const [hasImage, setHasImage] = useState(false)
    const [message, setMessage] = useState("");
    const [textData, setTextData] = useState([])
    // const [capturing, setCapturing] = useState(true)

    const handleFile = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    }


    const captureImage = () => {
        console.log("Clicking...");
        const imageSrc = webcamRef.current.getScreenshot();
        recognizeText(imageSrc)
    }

    const handleClear = () => {
        setHasImage(false);
        setMessage("");
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setHasImage(true);
        recognizeText(newFile);
    }


    const recognizeText = async (imageFile) => {
        setMessage("Identifying text...")
        const response = await Tesseract.recognize(imageFile, "eng")
        const { data } = response;
        if (data?.text) {
            const text = chain(data?.text)
                .replace(/(\r\n|\n|\r)/gm, " ")
                .replace(/,/g, "")
                .replace(/\./g, "")
                .trim()
                .lowerCase()
                .value();
            const words = chain(text)
                .split(" ")
                .map((item) => {
                    if (item) {
                        return item;
                    }
                })
                .value();

            console.log("words > ", words);
            if (difference(VALID_WORDS, words)?.length === 0) {
                setMessage("Text Identified Successfully")
                setTextData([...textData, data.text]);
            } else {
                setMessage("Could not find required text in the image.");
                captureImage()
            }
        } else {
            setMessage("Could not find any text in image.");
        }
    }
    return (
        <>
            <div className='image-container' style={{ border: '2px solid black', width: '154px', marginLeft: '45%', marginTop: '100px' }}>
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
            <div style={{ marginLeft: '105px' }}>
                <Webcam
                    ref={webcamRef}
                    height={300}
                    screenshotFormat="image/png"
                    width={300}
                    screenshotQuality={1}
                    forceScreenshotSourceSize={true}
                    videoConstraints={{
                        height: 720,
                        width: 1280, facingMode: 'environment'
                    }}
                    onUserMedia={() => console.log("camera open successfully")}
                    onUserMediaError={(e) => console.warn("camera error: ", e)}

                // style={{border: '2px solid black'}}
                />
                <button style={{ marginLeft: '235px' }} onClick={captureImage}>Capture photo</button>
                {/* <button style={{marginLeft: '235px'}} onClick={setCapturing(false)}>stop capturing</button> */}
            </div>
            <div className="message" style={{ marginLeft: '45%', marginTop: '10px' }}>{message}</div>
            {textData.length > 0 && textData.map((text, i) =>
                <div key={i}>
                    <h5 style={{ marginLeft: '10%', marginTop: '20px' }}>Processed Data</h5>
                    <pre style={{ marginLeft: '10%', marginTop: '20px', fontSize: '20px' }}>{text}</pre></div>)}
        </>
    )
}

export default TextReader