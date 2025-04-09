import React, { useState } from 'react'
import { addCompany } from '../features/companySlice'
import { useDispatch } from 'react-redux'
import { FloatingLabel } from 'react-bootstrap'

const CompanyForm = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [ceoName, setCeoName] = useState('')
    const [country, setCountry] = useState('')
    const [domain, setDomain] = useState('')
    const [employeeCount, setEmployeeCount] = useState('')
    const [industry, setIndustry] = useState('')
    const [name, setName] = useState('')

    const handleClear = () => {
        setAddress('')
        setCeoName('')
        setCountry('')
        setDomain('')
        setEmployeeCount('')
        setIndustry('')
        setName('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const companyData = {
            address,
            ceoName,
            country,
            domain,
            employeeCount,
            industry,
            name
        }
        dispatch(addCompany(companyData))
        handleClear()
    }

    return (
        <div className="accordion" id="accordionExample">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Company Append
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <form style={{ margin: '70px' }}>
                        <div className="form-inline" >
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Name"
                                    className="mb-3"
                                >
                                    <input type="text" value={name || ""} className="form-control" name="name" onChange={(e) => setName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Address"
                                    className="mb-3"
                                >
                                    <input className="form-control" value={address || ""} name="address" onChange={(e) => setAddress(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="CEO Name"
                                    className="mb-3"
                                >
                                    <input className="form-control" value={ceoName || ""} name="ceoName" onChange={(e) => setCeoName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Country"
                                    className="mb-3"
                                >
                                    <input type="text" value={country || ""} className="form-control" name="country" onChange={(e) => setCountry(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Domain"
                                    className="mb-3"
                                >
                                    <input type="text" value={domain || ""} className="form-control" name="domain" onChange={(e) => setDomain(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Employee Count"
                                    className="mb-3"
                                >
                                    <input type="text" value={employeeCount || ""} className="form-control" name="employeeCount" onChange={(e) => setEmployeeCount(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="form-group">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Industry"
                                    className="mb-3"
                                >
                                    <input type="text" value={industry || ""} className="form-control" name="industry" onChange={(e) => setIndustry(e.target.value)} />
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
    )
}

export default CompanyForm