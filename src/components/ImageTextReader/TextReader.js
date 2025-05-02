import React, { useEffect, useRef, useState } from 'react'
import Tesseract from "tesseract.js";
import uploadIcon from '../image/upload.png'
import clearIcon from '../image/clear.png'
import Webcam from "react-webcam";
import { chain, difference } from 'lodash';

const inv1 = ['lil', 'reds', 'takeout', 'and', 'c', 'oxtail', 'gravy', 'subtotal', 'taxes', 'tip', 'discount', 'total']
const inv2 = ['order', 'sandwich', 'shop', 'tip', 'total', 'your', 'delivery', 'by', 'view', 'store', 'opens', 'at']
const inv3 = ['coastline', 'burgers', 'redmond', '16244', 'cleveland', 'street', '98052', 'to', 'go', 'ordered', 'subtotal', 'tax']
const inv4 = ['greek', 'and', 'american', '2512', 'colby', 'everett', '98201', 'ordered', 'how', 'was', 'your', 'visit', 'restaurant', 'reach', 'contact']
const inv5 = ['bao', 'boss', 'order', 'details', 'subtotal', 'estimated', 'tax', 'discount', 'total']
const inv6 = ['buffalo', 'wild', 'wing', 'grill', 'bar', '1450', 'ala', 'moana', 'blvd', 'unit', '3326', 'table', 'guests', 'order', 'type', 'subtotal', 'tax', 'total', 'balance', 'due']


const VALID_WORDS = inv1 || inv2 || inv3 || inv4 || inv5 || inv6

const TextReader = () => {
    const webcamRef = useRef(null);
    const inputRef = useRef(null);
    const [hasImage, setHasImage] = useState(false)
    const [message, setMessage] = useState("");
    const [textData, setTextData] = useState([])

    const handleFile = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            captureImage();
            console.log("capturing...");

        }, 10000);
        return () => {
            clearInterval(interval);
            console.log("clear");
        };
    }, [])

    const captureImage = () => {
        console.log("Clicking...");
        const imageSrc = webcamRef.current.getScreenshot();
        recognizeText(imageSrc)
        setHasImage(true)
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
                    width={400}
                    screenshotQuality={1}
                    forceScreenshotSourceSize={true}
                    videoConstraints={{
                        height: 720,
                        width: 1280, facingMode: 'environment'
                    }}
                    onUserMedia={() => console.log("camera started")}
                    onUserMediaError={(e) => console.warn("camera error: ", e)}
                />
                <button style={{ marginLeft: '235px' }} onClick={captureImage}>Capture photo</button>
            </div>
            <div className="message" style={{ marginLeft: '45%', marginTop: '10px' }}>{message}</div>
            {textData.length > 0 && textData.map((text, i) =>
                <div key={i}>
                    <h5 style={{ marginLeft: '10%', marginTop: '20px' }}>Processed Data</h5>
                    <pre style={{ marginLeft: '10%', marginTop: '20px', fontSize: '20px' }}>{text}</pre>
                </div>
            )}
        </>
    )
}

export default TextReader










































// 10: 30 - 11: 40 ===> project setup

// 11:40 -  1: 30 ===> correction is extractText file (run build)

// 1: 50 -- 3: 40 ===> remove button and valid word array and add time interval of 10 second  from logic error after deploy

// 3: 40 --   ==> webca, not show after deply issue