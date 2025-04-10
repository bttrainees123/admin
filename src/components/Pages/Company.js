import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCompany } from '../features/companySlice'
import globe from "../image/globe.png"
import CompanyForm from './Forms/CompanyForm'
const Company = () => {
    const dispatch = useDispatch()
    const [loggedInUser, setLoggedInUser] = useState('')
    const { loading, error, res } = useSelector((state) => state.company)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log("Loggedin ", user);
        
        if(user){
          setLoggedInUser(user)
          console.log('Logged ', loggedInUser);
          
        }
      }, [])

    useEffect(() => {
        dispatch(getCompany())
    }, [dispatch])
    return (
        <div className="row">
            <div className="col-lg-12">
                {res.length ? (res.map((company, ind) => (
                    <div key={ind} className="professional_info " style={{ marginBottom: '10px' }}>
                        <div className="project-card-top row ">
                            <div className="col-lg-12">
                                <div
                                    className="project-card-heading d-flex align-items-center justify-content-between">
                                    <div className="body_heading2 mb-0">
                                        <h2 className="font-18 mb-0">{company.name}</h2>
                                        <p className="mb-0 body-sub-heading font-12">industry:- <span>{company.industry}</span></p>
                                    </div>
                                    <p className="mb-0 font-14 body-sub-heading ">CEO: <span> {company.ceoName}
                                    </span> </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="technology-heading d-flex align-items-center justify-content-between">
                                    <p className="my-2 font-14 body-sub-heading "><span className="me-2"><img
                                        src={globe} alt="" /></span>Domain: <span> {company.domain}</span></p>
                                    <p className="my-2 font-14 body-sub-heading ">Country: <span>{company.country}</span>
                                    </p>
                                </div>
                                <div className="project-progress mt-2">
                                    <div className="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar " style={{ width: '25%' }}></div>

                                    </div>
                                </div>
                                <div className=" d-flex align-items-center justify-content-between">
                                    <p className="my-2 font-14 body-sub-heading ">Phone No.:  <span>
                                        {company.marketCap}</span></p>
                                    <p className="my-2 font-14 body-sub-heading ">Employees: <span>{company.employeeCount} </span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-between project-detail-card-left">
                                <div className="d-flex gap-3">
                                    <div>
                                    </div>
                                    <div>
                                        <p className="font-14 mb-0">Company Address: </p>
                                        <p className="font-14 color-para mb-0">{company.address}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <div>
                                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.00008 15.8334C9.1649 15.8334 9.32601 15.7845 9.46306 15.6929C9.6001 15.6014 9.70691 15.4712 9.76998 15.3189C9.83305 15.1667 9.84956 14.9991 9.8174 14.8375C9.78525 14.6758 9.70588 14.5273 9.58934 14.4108C9.47279 14.2942 9.32431 14.2149 9.16265 14.1827C9.001 14.1506 8.83345 14.1671 8.68118 14.2301C8.52891 14.2932 8.39876 14.4 8.30719 14.5371C8.21562 14.6741 8.16675 14.8352 8.16675 15C8.16675 15.2211 8.25454 15.433 8.41082 15.5893C8.5671 15.7456 8.77907 15.8334 9.00008 15.8334ZM13.1667 15.8334C13.3316 15.8334 13.4927 15.7845 13.6297 15.6929C13.7668 15.6014 13.8736 15.4712 13.9366 15.3189C13.9997 15.1667 14.0162 14.9991 13.9841 14.8375C13.9519 14.6758 13.8725 14.5273 13.756 14.4108C13.6395 14.2942 13.491 14.2149 13.3293 14.1827C13.1677 14.1506 13.0001 14.1671 12.8478 14.2301C12.6956 14.2932 12.5654 14.4 12.4739 14.5371C12.3823 14.6741 12.3334 14.8352 12.3334 15C12.3334 15.2211 12.4212 15.433 12.5775 15.5893C12.7338 15.7456 12.9457 15.8334 13.1667 15.8334ZM13.1667 12.5C13.3316 12.5 13.4927 12.4512 13.6297 12.3596C13.7668 12.268 13.8736 12.1379 13.9366 11.9856C13.9997 11.8333 14.0162 11.6658 13.9841 11.5041C13.9519 11.3425 13.8725 11.194 13.756 11.0775C13.6395 10.9609 13.491 10.8815 13.3293 10.8494C13.1677 10.8172 13.0001 10.8337 12.8478 10.8968C12.6956 10.9599 12.5654 11.0667 12.4739 11.2037C12.3823 11.3408 12.3334 11.5019 12.3334 11.6667C12.3334 11.8877 12.4212 12.0997 12.5775 12.256C12.7338 12.4122 12.9457 12.5 13.1667 12.5ZM9.00008 12.5C9.1649 12.5 9.32601 12.4512 9.46306 12.3596C9.6001 12.268 9.70691 12.1379 9.76998 11.9856C9.83305 11.8333 9.84956 11.6658 9.8174 11.5041C9.78525 11.3425 9.70588 11.194 9.58934 11.0775C9.47279 10.9609 9.32431 10.8815 9.16265 10.8494C9.001 10.8172 8.83345 10.8337 8.68118 10.8968C8.52891 10.9599 8.39876 11.0667 8.30719 11.2037C8.21562 11.3408 8.16675 11.5019 8.16675 11.6667C8.16675 11.8877 8.25454 12.0997 8.41082 12.256C8.5671 12.4122 8.77907 12.5 9.00008 12.5ZM14.8334 2.50004H14.0001V1.66671C14.0001 1.44569 13.9123 1.23373 13.756 1.07745C13.5997 0.921171 13.3878 0.833374 13.1667 0.833374C12.9457 0.833374 12.7338 0.921171 12.5775 1.07745C12.4212 1.23373 12.3334 1.44569 12.3334 1.66671V2.50004H5.66675V1.66671C5.66675 1.44569 5.57895 1.23373 5.42267 1.07745C5.26639 0.921171 5.05443 0.833374 4.83341 0.833374C4.6124 0.833374 4.40044 0.921171 4.24416 1.07745C4.08788 1.23373 4.00008 1.44569 4.00008 1.66671V2.50004H3.16675C2.50371 2.50004 1.86782 2.76343 1.39898 3.23227C0.93014 3.70112 0.666748 4.337 0.666748 5.00004V16.6667C0.666748 17.3298 0.93014 17.9656 1.39898 18.4345C1.86782 18.9033 2.50371 19.1667 3.16675 19.1667H14.8334C15.4965 19.1667 16.1323 18.9033 16.6012 18.4345C17.07 17.9656 17.3334 17.3298 17.3334 16.6667V5.00004C17.3334 4.337 17.07 3.70112 16.6012 3.23227C16.1323 2.76343 15.4965 2.50004 14.8334 2.50004ZM15.6667 16.6667C15.6667 16.8877 15.5789 17.0997 15.4227 17.256C15.2664 17.4122 15.0544 17.5 14.8334 17.5H3.16675C2.94573 17.5 2.73377 17.4122 2.57749 17.256C2.42121 17.0997 2.33341 16.8877 2.33341 16.6667V9.16671H15.6667V16.6667ZM15.6667 7.50004H2.33341V5.00004C2.33341 4.77903 2.42121 4.56707 2.57749 4.41079C2.73377 4.25451 2.94573 4.16671 3.16675 4.16671H4.00008V5.00004C4.00008 5.22106 4.08788 5.43302 4.24416 5.5893C4.40044 5.74558 4.6124 5.83337 4.83341 5.83337C5.05443 5.83337 5.26639 5.74558 5.42267 5.5893C5.57895 5.43302 5.66675 5.22106 5.66675 5.00004V4.16671H12.3334V5.00004C12.3334 5.22106 12.4212 5.43302 12.5775 5.5893C12.7338 5.74558 12.9457 5.83337 13.1667 5.83337C13.3878 5.83337 13.5997 5.74558 13.756 5.5893C13.9123 5.43302 14.0001 5.22106 14.0001 5.00004V4.16671H14.8334C15.0544 4.16671 15.2664 4.25451 15.4227 4.41079C15.5789 4.56707 15.6667 4.77903 15.6667 5.00004V7.50004ZM4.83341 12.5C4.99823 12.5 5.15935 12.4512 5.29639 12.3596C5.43343 12.268 5.54024 12.1379 5.60331 11.9856C5.66639 11.8333 5.68289 11.6658 5.65073 11.5041C5.61858 11.3425 5.53921 11.194 5.42267 11.0775C5.30613 10.9609 5.15764 10.8815 4.99599 10.8494C4.83434 10.8172 4.66678 10.8337 4.51451 10.8968C4.36224 10.9599 4.23209 11.0667 4.14052 11.2037C4.04895 11.3408 4.00008 11.5019 4.00008 11.6667C4.00008 11.8877 4.08788 12.0997 4.24416 12.256C4.40044 12.4122 4.6124 12.5 4.83341 12.5ZM4.83341 15.8334C4.99823 15.8334 5.15935 15.7845 5.29639 15.6929C5.43343 15.6014 5.54024 15.4712 5.60331 15.3189C5.66639 15.1667 5.68289 14.9991 5.65073 14.8375C5.61858 14.6758 5.53921 14.5273 5.42267 14.4108C5.30613 14.2942 5.15764 14.2149 4.99599 14.1827C4.83434 14.1506 4.66678 14.1671 4.51451 14.2301C4.36224 14.2932 4.23209 14.4 4.14052 14.5371C4.04895 14.6741 4.00008 14.8352 4.00008 15C4.00008 15.2211 4.08788 15.433 4.24416 15.5893C4.40044 15.7456 4.6124 15.8334 4.83341 15.8334Z"
                                                fill="#FF9325" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-14 mb-0">Due Date:</p>
                                        <p className="font-14 color-para mb-0">Friday, March 31th, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : loading ? <h5 style={{ textAlign: 'center' }}>Loading...</h5> : <h5 style={{ textAlign: 'center' }}>{'some thing wents wrong' || error}</h5>}
            </div>
            {loggedInUser.role === 'Editor' && <CompanyForm />}
            
        </div>
    )
}

export default Company