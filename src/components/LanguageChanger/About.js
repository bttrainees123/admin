import React from 'react'
import { useTranslation } from "react-i18next";
import Lang from './Lang';

const About = () => {
    const { t, ready } = useTranslation();

   

    if (ready) {
        return (
            <div className="App-header">
                <Lang/>
                <h2>{t("Hi")}</h2>
                <p>{t("Actions")}</p>
               
            </div>
        );
    }
    return <span>Loading...</span>;
}

export default About