// import React from 'react';
// import html2canvas from 'html2canvas';
// import { FacebookShareButton } from 'react-share';

// import React from 'react';
// import { Helmet } from 'react-helmet';
// import { FacebookShareButton } from 'react-share';
// const Main = () => {
//     const pageURL = 'https://n-again.com/in_restaurants/details/661675fec4bc8a7af3e4034f';
// const ogImage = 'https://n-again.com/images/1712748024775___2023-06-07.jpg';

//     const pageURL = 'https://n-again.com/in_restaurants/details/661675fec4bc8a7af3e4034f';
//     const appId = 'd58549c9-f2b1-46c5-8c86-f4b8b8a07ad7'

//     const captureScreenshot = async () => {
//         const canvas = await html2canvas(document.body);
//         return canvas.toDataURL('image/png');
//     };

//     const shareScreenshotWithLink = async (imageURL) => {
//         try {
//             // Convert dataURL to Blob
//             const response = await fetch(imageURL);
//             const blob = await response.blob();
//             const file = new File([blob], 'screenshot.png', { type: 'image/png' });
//             if (!navigator.canShare || !navigator.canShare({ files: [file] })) {
//                 alert('Your browser does not support sharing images.');
//                 return;
//             }
//             await navigator.share({
//                 title: 'Share Screenshot',
//                 text: `Check out this page: ${pageURL}`,
//                 url: pageURL,
//                 files: [file],
//             });
//         } catch (error) {
//             console.error('Error sharing:', error);
//             alert('Sharing images is not supported in this browser.');
//         }
//     };


//     const shareOnFacebookViaDialog = () => {
//         const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageURL)}&app_id=${appId}`;
//         window.open(facebookURL, '_blank');
//     }

    // return (
//         <div>
//             <button onClick={async () => {
//                 const imageURL = await captureScreenshot();
//                 shareScreenshotWithLink(imageURL);
//             }}>Share Screenshot with Link</button><br />


//             <FacebookShareButton url={pageURL}>
//                 Share on Facebook (with react-share)
//             </FacebookShareButton><br />
//             <button onClick={shareOnFacebookViaDialog}>
//                 Share on Facebook (via dialog)
//             </button>

//         </div>
//     );
// };


//   <div>
//     <Helmet>
//       <title>Restaurant Name | n-again.com</title>
//       <meta property="og:title" content="Restaurant Name | n-again.com" />
//       <meta property="og:description" content="Best restaurant in town. Check it out!" />
//       <meta property="og:image" content={ogImage} />
//       <meta property="og:url" content={pageURL} />
//       <meta property="og:type" content="website" />
//     </Helmet>
//     <FacebookShareButton url={pageURL}>
//       Share on Facebook
//     </FacebookShareButton>
//   </div>
// );
// }
// export default Main




import React from 'react';

const pageURL = 'https://n-again.com/in_restaurants/details/661675fec4bc8a7af3e4034f';

function Main() {
  const shareOnFacebook = () => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageURL)}`;
    window.open(facebookURL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Restaurant Name | n-again.com</h1>
      <p>Best restaurant in town. Check it out!</p>
      <img
        src="https://n-again.com/images/1712748024775___2023-06-07.jpg"
        alt="Restaurant"
        style={{ maxWidth: 400, width: '100%', marginBottom: 20 }}
      />
      <br />
      <button className="btn btn-primary" onClick={shareOnFacebook}>
        Share on Facebook
      </button>
      <br /><br />
      <p>
        <b>Note:</b> Facebook post me image preview tabhi dikhega jab OG meta tags sahi set hon aur image publicly accessible ho.<br />
        Share karne ke baad agar image na dikhe toh <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer">Facebook Debugger</a> se scrape karen.
      </p>
    </div>
  );
}

export default Main;
