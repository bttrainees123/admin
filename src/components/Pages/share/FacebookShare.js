import React from 'react';
import { Helmet } from 'react-helmet';

const FacebookShare = ({ title, description, imageUrl, pageUrl }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content="website" />

        </Helmet>
    );
};

export default FacebookShare;