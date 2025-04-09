import React from 'react'
import { useTranslation } from "react-i18next";

const languages =[
    {code: 'en', language: 'english'},
    {code: 'tm', language: 'tamil'},
    {code: 'sp', language: 'spanish'},
    {code: 'tl', language: 'telgu'},

]
const Lang = () => {
    const {i18n} = useTranslation()
    const handleChange= (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='btn-container'>
            {languages.map((lng) => {
                return <button className={lng.code === i18n.language?"selected":""} key={lng.code} onClick={() => handleChange(lng.code)}>{lng.language}</button>
            })
            }
        </div>
    )

}

export default Lang