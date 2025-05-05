import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TextHome = () => {
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState(null)

    useEffect(() => {
        const getInvoice = () => {
            const storedInvoice = JSON.parse(localStorage.getItem("data")) || [];
            if (storedInvoice) {
                setInvoice(storedInvoice)
            }
        }
        getInvoice()
    })

    const clearLocal = () => {
        localStorage.clear();
    }


    const captureImg = () => {
        navigate('/')
    }
    return (
        <>
            <div>TextHome</div>
            {/* <img src={invoice} alt='' /> */}
            <button onClick={captureImg}>Capture Invoice</button>
            {/* <button onClick={clearLocal}>Clear LocalStorage</button> */}
        </>
    )
}

export default TextHome