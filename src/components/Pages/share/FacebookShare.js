import React from 'react';
// import { Helmet } from 'react-helmet';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HeadProvider, Title, Link, Meta } from 'react-head';
const FacebookShare = (
    // { title, description, imageUrl, pageUrl }
) => {
    const imageUrl = 'https://n-again.com/images/1712748024775___2023-06-07.jpg';
    return (
        <HeadProvider>
            <Title>Title</Title>
            <meta property="og:description" content="Commisionn Calculator for all merchants!" />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={window.location.href} />
        </HeadProvider>
    );
};

export default FacebookShare;