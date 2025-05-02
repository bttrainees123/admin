import React from 'react'
import { useNavigate } from 'react-router-dom'

const TextHome = () => {
    const navigate = useNavigate()

    const captureImg = () => {
        navigate('/')
    }
    return (
        <>
            <div>TextHome</div>
            <button onClick={captureImg}>Capture Invoice</button>
        </>

    )
}

export default TextHome