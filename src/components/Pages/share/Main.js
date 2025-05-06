import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import img from '../../image/d1.jpg';
import axios from 'axios';

const Main = () => {
    const targetElement = useRef(null);
    const [screenshotUrl, setScreenshotUrl] = useState('');

    const handleScreenshot = async () => {
        try {
            const canvas = await html2canvas(targetElement.current);
            const screenshotData = canvas.toDataURL('image/png');
            console.log("screenshotData", screenshotData);

            const response = await axios.post(`https://n-again.com/api/uploadbase64`, { image: screenshotData });

            if (response.data?.status) {
                const uploadedUrl = 'https://n-again.com/images/' + response.data.data;
                setScreenshotUrl(uploadedUrl);
                const pageLink = window.location.href
                const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageLink)}}`;
                window.open(fbShareUrl, '_blank');
            } else {
                console.error("Something went wrong during image upload");
            }
        } catch (error) {
            console.error("Error capturing or uploading screenshot:", error);
        }
    };

    return (
        <div>
            <div ref={targetElement}>
                <img src={img} alt='' />
                <h1>This is the content to be screenshot</h1>
                <p>Some more content...</p>
            </div>

            <button onClick={handleScreenshot}>
                <FacebookIcon size={40} round />
            </button>

            <div style={{ border: '2px solid black', marginTop: '10px' }}>
                {screenshotUrl && <img src={screenshotUrl} alt='Screenshot' />}
            </div>

            {screenshotUrl && (
                <FacebookShareButton url={screenshotUrl}  >
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
            )}

            {/* {screenshotUrl && (
                <FacebookShareButton url={screenshotUrl} className="SocialMediaShareButton">
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
            )} */}
        </div>
    );
};

export default Main;

