import React, { useEffect, useRef, useState } from 'react'
import Tesseract from "tesseract.js";
import Webcam from "react-webcam";
import { chain, difference } from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const inv1 =
  ['lil',
    'reds',
    'takeout',
    'and',
    'c',
    'subtotal',
    'taxes',
    'tip',
    'discount',
    'total']
const inv2 =
  ['order',
    'sandwich',
    'shop',
    'tip',
    'total',
    'your',
    'order',
    'delivery',
    'by',
    'view',
    'store',
    'opens',
    'at']
const inv3 =
  ['coastline',
    'burgers',
    'redmond',
    'server',
    'check',
    'street',
    '98052',
    'ordered',
    'tax',
    'tip',
    'subtotal']
const inv4 =
  ['greek',
    'and',
    'american',
    'colby',
    'everett',
    '98201',
    'take',
    'out',
    'ordered',
    'how',
    'was',
    'your',
    'visit',
    'restaurant',
    'reach',
    'contact']
const inv5 =
  ['bao',
    'boss',
    'order',
    'details',
    'subtotal',
    'estimated',
    'tax',
    'review',
    'store',
    'discount',
    'total']
const inv6 =
  ['buffalo',
    'wild',
    'wings',
    'grill',
    'bar',
    '1450',
    'ala',
    'moana',
    'blvd',
    'unit',
    '3326',
    'server',
    'table',
    'guests',
    'order',
    'type',
    'subtotal',
    'tax',
    'total',
    'balance',
    'due']

const TextReader = () => {
  const navigate = useNavigate()
  const webcamRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isCapture, setIsCapture] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCapture) {
        captureImage();
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  })

  const PostImage = async (img, txt) => {
    try {
      const formData = new FormData();
      formData.append("tempImage", img)
      const apiResponse = await axios
        .post(`https://n-again.com/api/uploadImageArr`,
          formData);
      if (apiResponse.data.status) {
        return apiResponse.data.path
      }
      else {
        console.error(apiResponse?.data?.message)
      }
    }
    catch (err) {
      console.error(err?.message);
    }
  }

  const uploadBase64 = async (imageUrl, txt) => {
    try {
      const response = await axios
        .post(`https://n-again.com/api/uploadbase64`,
          { image: imageUrl })
      if (response.data?.status) {
        setMessage('https://n-again.com/images/' + response?.data?.data)
        navigate('/text-home')
      }
      else {
        setMessage("Image uploaded")
      }
    }
    catch (err) {
      console.error(err);
      setMessage("error: ",err)
    }
  }

  const captureImage = () => {
    if (isCapture) return
    const imageUrl = webcamRef.current.getScreenshot();
    if (imageUrl) {
      recognizeText(imageUrl)
    }
  }

   const recognizeText = async (imageFile) => {
      setIsCapture(true)
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
            // if (item) {
            return item;
            // }
          }
          )
          .value();
        if (difference(inv1, words)?.length === 0 ||
          difference(inv2, words)?.length === 0 ||
          difference(inv3, words)?.length === 0 ||
          difference(inv4, words)?.length === 0 ||
          difference(inv5, words)?.length === 0 ||
          difference(inv6, words)?.length === 0) {
          if (typeof imageFile === 'string') {
            if (!isCapture) {
              uploadBase64(imageFile, data.text)
            }
            setMessage(`Text Identified Successfully - Base64`)
          }
          else {
            PostImage(imageFile, data.text)
            setMessage(`Text Identified Successfully - Image`)
          }
        } else {
          setMessage("Could not find required text in the image.");
          setIsCapture(false)
        }
      } else {
        setMessage("Could not find any text in image.");
        setIsCapture(false)
      }
    }

  return (
    <>
      <div style={{ position: 'fixed', left: '0', top: '0', width: '100vw', height: '100vh', backgroundColor: '#000' }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={100 + '%'}
          width={100 + '%'}
          screenshotQuality={1}
          forceScreenshotSourceSize={true}
          videoConstraints={{
            height: 720,
            width: 1280, facingMode: 'environment'
          }}
          onUserMedia={() => console.log("camera started")}
          onUserMediaError={(e) => console.warn("camera error: ", e)}
          style={{
            border: '1px solid black',
            objectFit: 'cover'
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
          textAlign: 'center',
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}
      >
        {message || `Identifying text...`}
      </div>
    </>
  )
}

export default TextReader











