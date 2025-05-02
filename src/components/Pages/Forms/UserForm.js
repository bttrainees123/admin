import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../../features/apiSlice'
import { FloatingLabel } from 'react-bootstrap'

const UserForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [suite, setSuite] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const handleClear = () => {
        setUsername('')
        setName('')
        setEmail('')
        setSuite('')
        setCity('')
        setStreet('')
        setZipcode('')
        setLat('')
        setLng('')

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username,
            email,
            name,
            address: {
                suite,
                city,
                street,
                zipcode,
                geo: {
                    lat,
                    lng
                }
            }
        }
        dispatch(addUser(userData))
        handleClear()
    }
    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Add User
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <form style={{ margin: '70px' }}>
                            <div className="form-inline" >
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3" >
                                        <input type="text" value={username || ""} className="form-control" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Name" className="mb-3" >
                                        <input className="form-control" value={name || ""} name="name" onChange={(e) => setName(e.target.value)} placeholder="name"/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
                                        <input className="form-control" value={email || ""} name="email" onChange={(e) => setEmail(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Suite" className="mb-3" >
                                        <input type="text" value={suite || ""} className="form-control" name="suite" onChange={(e) => setSuite(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="City" className="mb-3" >
                                        <input type="text" value={city || ""} className="form-control" name="city" onChange={(e) => setCity(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Street" className="mb-3">
                                        <input type="text" value={street || ""} className="form-control" name="street" onChange={(e) => setStreet(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="ZipCode" className="mb-3" >
                                        <input type="text" value={zipcode || ""} className="form-control" name="street" onChange={(e) => setZipcode(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Lng." className="mb-3" >
                                        <input type="text" value={lng || ""} className="form-control" name="lng" onChange={(e) => setLng(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group">
                                    <FloatingLabel controlId="floatingInput" label="Lat." className="mb-3" >
                                        <input type="text" value={lat || ""} className="form-control" name="lat" onChange={(e) => setLat(e.target.value)} placeholder=""/>
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="button-section">
                                <button className="btn btn-primary" onClick={handleSubmit} style={{ margin: '5px' }} type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm