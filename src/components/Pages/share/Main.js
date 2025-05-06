import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import img from '../../image/d1.jpg'

const Main = () => {
    const targetElement = useRef(null);
    const [screenshotUrl, setScreenshotUrl] = useState('');

    const handleScreenshot = async () => {
        const canvas = await html2canvas(targetElement.current);
        const screenshotData = canvas.toDataURL('image/png');
        setScreenshotUrl(screenshotData);
    };
    return (
        <div>
            <div ref={targetElement}>
                <img src={img} alt='' />
                <h1>This is the content to be screenshot</h1>
                <p>Some more content...</p>
            </div>

            <button onClick={handleScreenshot}>Take Screenshot</button>

            <div style={{ border: '2px solid black' }}>
                {screenshotUrl && (
                    <img src={screenshotUrl} alt='' />
                )}
            </div>


            {screenshotUrl && (
                <FacebookShareButton
                    url={screenshotUrl}
                    className="SocialMediaShareButton"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            )}
        </div>
    )
}

export default Main