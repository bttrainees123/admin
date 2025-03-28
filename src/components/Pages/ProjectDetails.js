import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clock from "../image/clock.png"
import angleDown from "../image/angle-down.png"
import play from "../image/play.png"
import notification from "../image/notification.svg"
import deletePic from "../image/delete1.svg"
import pdf from "../image/pdf.png"
import image from "../image/image.png"
import Comment from './Comment'
import Sideer from '../sider/Sideer'
import Company from './Company'

const ProjectDetails = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false)
        navigate("/login")
    }
    return (
        <>
            <div className="main_container">
                <div className="limani_body">
                    {/* <div className="intersight_menu">
                        <div className="top_menu">
                            <div className="brand">
                                <div className="dropdown">
                                    <button className="dropdown-toggle border-0 w-100 d-flex align-items-center" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="d-flex align-items-center justify-content-center">
                                            <img src={logo2} alt="" srcSet="" />
                                        </span> Brain Technosys PMS
                                    </button>
                                </div>
                            </div>

                            <div className="intersight_home">
                                <div className="menu_div">
                                    <ul>
                                        <li><Link to="/">
                                            <span>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.5 16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V7.76166C2.49995 7.63578 2.52842 7.51153 2.58326 7.39823C2.63811 7.28493 2.71791 7.18553 2.81667 7.10749L9.48333 1.84832C9.63046 1.73206 9.81249 1.66882 10 1.66882C10.1875 1.66882 10.3695 1.73206 10.5167 1.84832L17.1833 7.10666C17.2822 7.18478 17.3621 7.28432 17.4169 7.39777C17.4718 7.51123 17.5002 7.63564 17.5 7.76166V16.6667ZM5.83333 9.99999C5.83333 11.1051 6.27232 12.1649 7.05372 12.9463C7.83512 13.7277 8.89493 14.1667 10 14.1667C11.1051 14.1667 12.1649 13.7277 12.9463 12.9463C13.7277 12.1649 14.1667 11.1051 14.1667 9.99999H12.5C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 9.99999H5.83333Z"
                                                        fill="black" />
                                                </svg>
                                            </span> Dashboard</Link>
                                        </li>
                                        <li className="without_label">Workspace</li>
                                        <li><Link to="/" className="active">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M19 6.5H16V5.5C16 4.70435 15.6839 3.94129 15.1213 3.37868C14.5587 2.81607 13.7956 2.5 13 2.5H11C10.2044 2.5 9.44129 2.81607 8.87868 3.37868C8.31607 3.94129 8 4.70435 8 5.5V6.5H5C4.20435 6.5 3.44129 6.81607 2.87868 7.37868C2.31607 7.94129 2 8.70435 2 9.5V18.5C2 19.2956 2.31607 20.0587 2.87868 20.6213C3.44129 21.1839 4.20435 21.5 5 21.5H19C19.7956 21.5 20.5587 21.1839 21.1213 20.6213C21.6839 20.0587 22 19.2956 22 18.5V9.5C22 8.70435 21.6839 7.94129 21.1213 7.37868C20.5587 6.81607 19.7956 6.5 19 6.5ZM10 5.5C10 5.23478 10.1054 4.98043 10.2929 4.79289C10.4804 4.60536 10.7348 4.5 11 4.5H13C13.2652 4.5 13.5196 4.60536 13.7071 4.79289C13.8946 4.98043 14 5.23478 14 5.5V6.5H10V5.5ZM20 18.5C20 18.7652 19.8946 19.0196 19.7071 19.2071C19.5196 19.3946 19.2652 19.5 19 19.5H5C4.73478 19.5 4.48043 19.3946 4.29289 19.2071C4.10536 19.0196 4 18.7652 4 18.5V13C4.97544 13.3869 5.97818 13.7011 7 13.94V14.53C7 14.7952 7.10536 15.0496 7.29289 15.2371C7.48043 15.4246 7.73478 15.53 8 15.53C8.26522 15.53 8.51957 15.4246 8.70711 15.2371C8.89464 15.0496 9 14.7952 9 14.53V14.32C9.99435 14.4554 10.9965 14.5255 12 14.53C13.0035 14.5255 14.0057 14.4554 15 14.32V14.53C15 14.7952 15.1054 15.0496 15.2929 15.2371C15.4804 15.4246 15.7348 15.53 16 15.53C16.2652 15.53 16.5196 15.4246 16.7071 15.2371C16.8946 15.0496 17 14.7952 17 14.53V13.94C18.0218 13.7011 19.0246 13.3869 20 13V18.5ZM20 10.81C19.0274 11.2205 18.0244 11.5548 17 11.81V11.5C17 11.2348 16.8946 10.9804 16.7071 10.7929C16.5196 10.6054 16.2652 10.5 16 10.5C15.7348 10.5 15.4804 10.6054 15.2929 10.7929C15.1054 10.9804 15 11.2348 15 11.5V12.24C13.0113 12.54 10.9887 12.54 9 12.24V11.5C9 11.2348 8.89464 10.9804 8.70711 10.7929C8.51957 10.6054 8.26522 10.5 8 10.5C7.73478 10.5 7.48043 10.6054 7.29289 10.7929C7.10536 10.9804 7 11.2348 7 11.5V11.83C5.97562 11.5748 4.9726 11.2405 4 10.83V9.5C4 9.23478 4.10536 8.98043 4.29289 8.79289C4.48043 8.60536 4.73478 8.5 5 8.5H19C19.2652 8.5 19.5196 8.60536 19.7071 8.79289C19.8946 8.98043 20 9.23478 20 9.5V10.81Z"
                                                        fill="black" />
                                                </svg>

                                            </span> Projects</Link>
                                        </li>
                                        <li><Link to="/">
                                            <span>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M14.1667 1.66667H16.6667C16.8877 1.66667 17.0996 1.75446 17.2559 1.91074C17.4122 2.06702 17.5 2.27899 17.5 2.5V17.5C17.5 17.721 17.4122 17.933 17.2559 18.0893C17.0996 18.2455 16.8877 18.3333 16.6667 18.3333H3.33333C3.11232 18.3333 2.90036 18.2455 2.74408 18.0893C2.5878 17.933 2.5 17.721 2.5 17.5V2.5C2.5 2.27899 2.5878 2.06702 2.74408 1.91074C2.90036 1.75446 3.11232 1.66667 3.33333 1.66667H5.83333V0H7.5V1.66667H12.5V0H14.1667V1.66667ZM5.83333 6.66667V8.33333H14.1667V6.66667H5.83333ZM5.83333 10V11.6667H14.1667V10H5.83333Z"
                                                        fill="black" />
                                                </svg>

                                            </span> Task</Link>
                                        </li>
                                        <li><Link to="/">
                                            <span>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <clipPath id="url(#clip0_388_1610)">
                                                        <path
                                                            d="M5.04175 7.33335H5.50008V7.79169C5.50008 8.0348 5.59666 8.26796 5.76857 8.43987C5.94047 8.61178 6.17363 8.70835 6.41675 8.70835C6.65986 8.70835 6.89302 8.61178 7.06493 8.43987C7.23684 8.26796 7.33341 8.0348 7.33341 7.79169V7.33335H7.79175C8.03486 7.33335 8.26802 7.23678 8.43993 7.06487C8.61184 6.89296 8.70841 6.6598 8.70841 6.41669C8.70841 6.17357 8.61184 5.94041 8.43993 5.76851C8.26802 5.5966 8.03486 5.50002 7.79175 5.50002H7.33341V5.04169C7.33341 4.79857 7.23684 4.56541 7.06493 4.39351C6.89302 4.2216 6.65986 4.12502 6.41675 4.12502C6.17363 4.12502 5.94047 4.2216 5.76857 4.39351C5.59666 4.56541 5.50008 4.79857 5.50008 5.04169V5.50002H5.04175C4.79863 5.50002 4.56548 5.5966 4.39357 5.76851C4.22166 5.94041 4.12508 6.17357 4.12508 6.41669C4.12508 6.6598 4.22166 6.89296 4.39357 7.06487C4.56548 7.23678 4.79863 7.33335 5.04175 7.33335ZM4.47341 17.5267C4.64516 17.6974 4.87749 17.7932 5.11966 17.7932C5.36184 17.7932 5.59417 17.6974 5.76591 17.5267L6.41675 16.8759L7.06758 17.5267C7.23933 17.6974 7.47166 17.7932 7.71383 17.7932C7.956 17.7932 8.18833 17.6974 8.36008 17.5267C8.53081 17.3549 8.62664 17.1226 8.62664 16.8804C8.62664 16.6383 8.53081 16.4059 8.36008 16.2342L7.70925 15.5834L8.36008 14.9325C8.51026 14.7572 8.58873 14.5316 8.57982 14.3009C8.57091 14.0702 8.47527 13.8513 8.31201 13.6881C8.14876 13.5248 7.92992 13.4292 7.69921 13.4203C7.46851 13.4114 7.24294 13.4898 7.06758 13.64L6.41675 14.2909L5.76591 13.64C5.59055 13.4898 5.36499 13.4114 5.13428 13.4203C4.90358 13.4292 4.68474 13.5248 4.52148 13.6881C4.35823 13.8513 4.26259 14.0702 4.25368 14.3009C4.24477 14.5316 4.32324 14.7572 4.47341 14.9325L5.12425 15.5834L4.47341 16.2342C4.30268 16.4059 4.20685 16.6383 4.20685 16.8804C4.20685 17.1226 4.30268 17.3549 4.47341 17.5267ZM18.3334 0.916687H3.66675C2.9374 0.916687 2.23793 1.20642 1.7222 1.72214C1.20648 2.23787 0.916748 2.93734 0.916748 3.66669V18.3334C0.916748 19.0627 1.20648 19.7622 1.7222 20.2779C2.23793 20.7936 2.9374 21.0834 3.66675 21.0834H18.3334C19.0628 21.0834 19.7622 20.7936 20.278 20.2779C20.7937 19.7622 21.0834 19.0627 21.0834 18.3334V3.66669C21.0834 2.93734 20.7937 2.23787 20.278 1.72214C19.7622 1.20642 19.0628 0.916687 18.3334 0.916687ZM10.0834 19.25H3.66675C3.42363 19.25 3.19047 19.1534 3.01857 18.9815C2.84666 18.8096 2.75008 18.5765 2.75008 18.3334V11.9167H10.0834V19.25ZM10.0834 10.0834H2.75008V3.66669C2.75008 3.42357 2.84666 3.19041 3.01857 3.01851C3.19047 2.8466 3.42363 2.75002 3.66675 2.75002H10.0834V10.0834ZM19.2501 18.3334C19.2501 18.5765 19.1535 18.8096 18.9816 18.9815C18.8097 19.1534 18.5765 19.25 18.3334 19.25H11.9167V11.9167H19.2501V18.3334ZM19.2501 10.0834H11.9167V2.75002H18.3334C18.5765 2.75002 18.8097 2.8466 18.9816 3.01851C19.1535 3.19041 19.2501 3.42357 19.2501 3.66669V10.0834ZM14.2084 15.125H16.9584C17.2015 15.125 17.4347 15.0284 17.6066 14.8565C17.7785 14.6846 17.8751 14.4515 17.8751 14.2084C17.8751 13.9652 17.7785 13.7321 17.6066 13.5602C17.4347 13.3883 17.2015 13.2917 16.9584 13.2917H14.2084C13.9653 13.2917 13.7321 13.3883 13.5602 13.5602C13.3883 13.7321 13.2917 13.9652 13.2917 14.2084C13.2917 14.4515 13.3883 14.6846 13.5602 14.8565C13.7321 15.0284 13.9653 15.125 14.2084 15.125ZM16.9584 5.50002H14.2084C13.9653 5.50002 13.7321 5.5966 13.5602 5.76851C13.3883 5.94041 13.2917 6.17357 13.2917 6.41669C13.2917 6.6598 13.3883 6.89296 13.5602 7.06487C13.7321 7.23678 13.9653 7.33335 14.2084 7.33335H16.9584C17.2015 7.33335 17.4347 7.23678 17.6066 7.06487C17.7785 6.89296 17.8751 6.6598 17.8751 6.41669C17.8751 6.17357 17.7785 5.94041 17.6066 5.76851C17.4347 5.5966 17.2015 5.50002 16.9584 5.50002ZM14.2084 17.875H16.9584C17.2015 17.875 17.4347 17.7784 17.6066 17.6065C17.7785 17.4346 17.8751 17.2015 17.8751 16.9584C17.8751 16.7152 17.7785 16.4821 17.6066 16.3102C17.4347 16.1383 17.2015 16.0417 16.9584 16.0417H14.2084C13.9653 16.0417 13.7321 16.1383 13.5602 16.3102C13.3883 16.4821 13.2917 16.7152 13.2917 16.9584C13.2917 17.2015 13.3883 17.4346 13.5602 17.6065C13.7321 17.7784 13.9653 17.875 14.2084 17.875Z"
                                                            fill="black" />
                                                    </clipPath>
                                                    <defs>
                                                        <clipPath id="clip0_388_1610">
                                                            <rect width="22" height="22" fill="black" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>Estimation</Link>
                                        </li>
                                        <li><Link to="/">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15 11H13V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51808 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9971 9.34874 20.9425 6.80691 19.0678 4.93219C17.1931 3.05746 14.6513 2.00295 12 2ZM12 20C10.4178 20 8.87103 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60896 15.0615C4.00346 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C19.9976 14.121 19.1539 16.1544 17.6542 17.6542C16.1544 19.1539 14.121 19.9976 12 20Z"
                                                        fill="black" />
                                                </svg>

                                            </span> Activity Log</Link>
                                        </li>
                                        <li><Link to="/">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M19.63 3.64994C19.5138 3.55596 19.3781 3.48922 19.2327 3.45461C19.0873 3.41999 18.9361 3.4184 18.79 3.44994C17.7214 3.67389 16.6183 3.67674 15.5486 3.45833C14.4789 3.23991 13.4652 2.80486 12.57 2.17994C12.4026 2.06381 12.2037 2.00159 12 2.00159C11.7963 2.00159 11.5974 2.06381 11.43 2.17994C10.5348 2.80486 9.52107 3.23991 8.45136 3.45833C7.38166 3.67674 6.27856 3.67389 5.21 3.44994C5.06394 3.4184 4.91266 3.41999 4.7673 3.45461C4.62193 3.48922 4.48617 3.55596 4.37 3.64994C4.25398 3.74406 4.16052 3.86298 4.09649 3.99796C4.03246 4.13294 3.99949 4.28055 4 4.42994V11.8799C3.99911 13.3137 4.34077 14.7269 4.99653 16.0019C5.65229 17.2769 6.60318 18.3768 7.77 19.2099L11.42 21.8099C11.5894 21.9305 11.7921 21.9953 12 21.9953C12.2079 21.9953 12.4106 21.9305 12.58 21.8099L16.23 19.2099C17.3968 18.3768 18.3477 17.2769 19.0035 16.0019C19.6592 14.7269 20.0009 13.3137 20 11.8799V4.42994C20.0005 4.28055 19.9675 4.13294 19.9035 3.99796C19.8395 3.86298 19.746 3.74406 19.63 3.64994ZM18 11.8799C18.0008 12.9947 17.7353 14.0935 17.2256 15.085C16.716 16.0764 15.977 16.9318 15.07 17.5799L12 19.7699L8.93 17.5799C8.02303 16.9318 7.28398 16.0764 6.77435 15.085C6.26471 14.0935 5.99923 12.9947 6 11.8799V5.57994C8.09643 5.75938 10.196 5.27297 12 4.18994C13.804 5.27297 15.9036 5.75938 18 5.57994V11.8799ZM13.54 9.58994L10.85 12.2899L9.96 11.3899C9.77169 11.2016 9.5163 11.0958 9.25 11.0958C8.9837 11.0958 8.7283 11.2016 8.54 11.3899C8.35169 11.5782 8.24591 11.8336 8.24591 12.0999C8.24591 12.3662 8.35169 12.6216 8.54 12.8099L10.14 14.4099C10.233 14.5037 10.3436 14.5781 10.4654 14.6288C10.5873 14.6796 10.718 14.7057 10.85 14.7057C10.982 14.7057 11.1127 14.6796 11.2346 14.6288C11.3564 14.5781 11.467 14.5037 11.56 14.4099L15 10.9999C15.1883 10.8116 15.2941 10.5562 15.2941 10.2899C15.2941 10.0236 15.1883 9.76825 15 9.57994C14.8117 9.39164 14.5563 9.28585 14.29 9.28585C14.0237 9.28585 13.7683 9.39164 13.58 9.57994L13.54 9.58994Z"
                                                        fill="black" />
                                                </svg>

                                            </span>Performance</Link>
                                        </li>

                                    </ul>
                                    <div className="bottom_menu">
                                        <p className="">Looking for something? <Link to="/"
                                            className="d-block text-decoration-underline">Help
                                            & Support</Link></p>
                                        <div className="user_person">
                                            <div className="dropdown">
                                                <button className="dropdown-toggle border-0 w-100 d-flex align-items-center"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span
                                                        className="d-flex align-items-center justify-content-center person_icon"><img
                                                            src={person} alt="" /></span>
                                                    <label className="person_name">
                                                        Ravi Sharma<span className="d-block">ravi@braintechnosys.com</span>
                                                    </label>
                                                </button>
                                                <ul className="dropdown-menu w-100">
                                                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                                                    <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Sideer/>
                    <div className="intersight_content">
                        <div className="body_content">
                            <div className="top_header d-flex align-items-center justify-content-between">
                                <h1>Excel To Insight Consulting</h1>
                                <div className="header_notification d-flex align-items-center gap-2">
                                    <div className="filter-dropdown green-filter dropdown time-tracking">
                                        <button className="btn filter-btn green-filter-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span><img src={clock} alt="" className="fltrimg" /> 00 : 12 : 01</span> <img src={angleDown} className="ms-1" alt="" />
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-end p-0">
                                            <div className="tracker_heading">
                                                <h6>Track Your Time</h6>
                                                <p>Select project and task to start tracking</p>
                                            </div>
                                            <div className="tracker-selection">
                                                <div className="row align-items-center">
                                                    <div className="col-md-5">
                                                        <div className="time_start border-end text-center">
                                                            <button className="btn"><img src={play} alt='' /></button>
                                                            <div className="time_record text-center">
                                                                <h6>00 : 12 : 01</h6>
                                                                <span>Today : 00 : 12 : 01</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="form-group mb-2">
                                                            <select className="form-select">
                                                                <option>Default Project</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <select className="form-select">
                                                                <option>Select Task</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="header_icon position-relative notification d-flex align-items-center justify-content-center">
                                        <img src={notification} alt='' />
                                        <span className="notification_alert"></span>
                                        <p>02</p>
                                    </div>
                                    <div
                                        className="header_icon position-relative notification d-flex align-items-center justify-content-center">
                                        <svg onClick={handleLogout} style={{ cursor: 'pointer' }} width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.5408 11.9167L9.43242 14.0158C9.3465 14.1011 9.27831 14.2024 9.23177 14.3141C9.18523 14.4259 9.16127 14.5457 9.16127 14.6667C9.16127 14.7877 9.18523 14.9075 9.23177 15.0192C9.27831 15.1309 9.3465 15.2323 9.43242 15.3175C9.51763 15.4034 9.61902 15.4716 9.73072 15.5182C9.84243 15.5647 9.96224 15.5887 10.0833 15.5887C10.2043 15.5887 10.3241 15.5647 10.4358 15.5182C10.5475 15.4716 10.6489 15.4034 10.7341 15.3175L14.4008 11.6508C14.4842 11.5637 14.5496 11.4609 14.5933 11.3483C14.6849 11.1252 14.6849 10.8748 14.5933 10.6517C14.5496 10.5392 14.4842 10.4364 14.4008 10.3492L10.7341 6.68251C10.6486 6.59704 10.5472 6.52924 10.4355 6.48299C10.3238 6.43673 10.2041 6.41293 10.0833 6.41293C9.96238 6.41293 9.84269 6.43673 9.73102 6.48299C9.61935 6.52924 9.51789 6.59704 9.43242 6.68251C9.34695 6.76798 9.27915 6.86944 9.2329 6.98111C9.18664 7.09278 9.16284 7.21247 9.16284 7.33334C9.16284 7.45421 9.18664 7.5739 9.2329 7.68557C9.27915 7.79724 9.34695 7.89871 9.43242 7.98418L11.5408 10.0833H2.74992C2.5068 10.0833 2.27365 10.1799 2.10174 10.3518C1.92983 10.5237 1.83325 10.7569 1.83325 11C1.83325 11.2431 1.92983 11.4763 2.10174 11.6482C2.27365 11.8201 2.5068 11.9167 2.74992 11.9167H11.5408ZM10.9999 1.83334C9.28675 1.82569 7.60573 2.29829 6.14751 3.19752C4.6893 4.09675 3.51227 5.38663 2.74992 6.92084C2.64052 7.13965 2.62252 7.39295 2.69987 7.62502C2.77723 7.8571 2.94362 8.04894 3.16242 8.15834C3.38122 8.26774 3.63452 8.28575 3.8666 8.20839C4.09868 8.13103 4.29052 7.96465 4.39992 7.74584C4.97943 6.57555 5.86093 5.58124 6.95334 4.86567C8.04575 4.15009 9.30942 3.7392 10.6138 3.67547C11.9181 3.61174 13.2158 3.89747 14.3728 4.50314C15.5298 5.10882 16.504 6.01245 17.1949 7.12067C17.8857 8.22889 18.2681 9.50149 18.3025 10.8069C18.3368 12.1124 18.022 13.4034 17.3905 14.5464C16.7589 15.6895 15.8336 16.6432 14.7102 17.3089C13.5867 17.9746 12.3058 18.3283 10.9999 18.3333C9.63306 18.3393 8.29223 17.9597 7.1313 17.2382C5.97038 16.5166 5.03641 15.4824 4.43659 14.2542C4.32718 14.0354 4.13534 13.869 3.90327 13.7916C3.67119 13.7143 3.41789 13.7323 3.19909 13.8417C2.98028 13.9511 2.8139 14.1429 2.73654 14.375C2.65918 14.6071 2.67718 14.8604 2.78659 15.0792C3.51334 16.5417 4.61765 17.7836 5.98527 18.6762C7.35289 19.5689 8.93416 20.08 10.5655 20.1566C12.1969 20.2332 13.8191 19.8726 15.2644 19.1121C16.7097 18.3515 17.9255 17.2187 18.7861 15.8307C19.6468 14.4427 20.121 12.85 20.1597 11.2173C20.1984 9.58456 19.8002 7.97115 19.0063 6.54394C18.2124 5.11673 17.0516 3.92753 15.644 3.09936C14.2364 2.27118 12.6331 1.83411 10.9999 1.83334Z"
                                                fill="#83838C" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-profile">
                                {/* <Company/> */}
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-between mb-30 mt-30">
                                        <h2 className="body_heading width-left-border mb-0">Comments List</h2>
                                        <div className="heading_width_search d-flex align-items-center gap-3">
                                            <Link className="btn blue-btn small_btn" data-bs-toggle="offcanvas" to="/offcanvasMilestone" role="button" aria-controls="offcanvasMilestone">View Milestones</Link>
                                        </div>
                                    </div>         
                                 <Comment/>
                                    {/* <div className="col-lg-3 col-md-6">
                                        <button className="list-btn sky-blue">Working (05)</button>
                                        <div className="list-data">
                                            <ul className="list-data-items">
                                                <li className="list-card mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="font-14 mb-0 color-purple"><span className="me-2"><svg width="10"
                                                            height="10" viewBox="0 0 10 10" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="10" height="10" rx="5" fill="#924AEF" />
                                                        </svg>
                                                        </span>Due in 4 days</p>


                                                        <div className="company-logo-dropdown">
                                                            <div className="dropdown">
                                                                <button
                                                                    className="dropdown-toggle border-0 w-100 d-flex align-items-center"
                                                                    type="button" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    <img src={ellipsis} alt='' />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end w-100 shadow">
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={eye} className="me-1" alt='' />View
                                                                    </Link></li>
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={deletePic} className="me-1" alt='' />Delete</Link>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-14 my-3 color-para">Visual Graphic for Presentation to Client
                                                        For New Version as a feedback <Link to="/"
                                                            className="color-blue text-decoration-underline">Read More...</Link> </p>

                                                    <div className="d-flex align-items-center gap-3 list-card-user-profile">
                                                        <img src={image1} alt="" />
                                                        <p className="font-14 mb-0 body-sub-heading ">Created by: <span>Vipin
                                                            Pal</span></p>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-lg-3 col-md-6">
                                        <button className="list-btn blue">Review (05)</button>
                                        <div className="list-data">
                                            <ul className="list-data-items">
                                                <li className="list-card mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="font-14 mb-0 color-purple"><span className="me-2"><svg width="10"
                                                            height="10" viewBox="0 0 10 10" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="10" height="10" rx="5" fill="#924AEF" />
                                                        </svg>
                                                        </span>Due in 4 days</p>

                                                        <div className="company-logo-dropdown">
                                                            <div className="dropdown">
                                                                <button
                                                                    className="dropdown-toggle border-0 w-100 d-flex align-items-center"
                                                                    type="button" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    <img src={ellipsis} alt='' />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end w-100 shadow">
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={eye} className="me-1" alt='' />View
                                                                    </Link></li>
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={deletePic} className="me-1" alt='' />Delete</Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-14 my-3 color-para">Visual Graphic for Presentation to Client
                                                        For New Version as a feedback <Link to="#"
                                                            className="color-blue text-decoration-underline">Read More...</Link> </p>

                                                    <div className="d-flex align-items-center gap-3 list-card-user-profile">
                                                        <img src={image1} alt="" />
                                                        <p className="font-14 mb-0 body-sub-heading ">Created by: <span>Vipin
                                                            Pal</span></p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <button className="list-btn ">Complete (18)</button>
                                        <div className="list-data">
                                            <ul className="list-data-items">
                                                <li className="list-card mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="font-14 mb-0 color-green"><span className="me-2"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="10" height="10" rx="5" fill="#689737" />
                                                        </svg>

                                                        </span>Completed</p>


                                                        <div className="company-logo-dropdown">
                                                            <div className="dropdown">
                                                                <button
                                                                    className="dropdown-toggle border-0 w-100 d-flex align-items-center"
                                                                    type="button" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    <img src={ellipsis} alt='' />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end w-100 shadow">
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={eye} className="me-1" alt='' />View
                                                                    </Link></li>
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={deletePic} className="me-1" alt='' />Delete</Link>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-14 my-3 color-para">Visual Graphic for Presentation to Client
                                                        For New Version as a feedback <Link to="/"
                                                            className="color-blue text-decoration-underline">Read More...</Link> </p>

                                                    <div className="d-flex align-items-center gap-3 list-card-user-profile">
                                                        <img src={image1} alt="" />
                                                        <p className="font-14 mb-0 body-sub-heading ">Created by: <span>Vipin
                                                            Pal</span></p>
                                                    </div>
                                                </li>
                                                <li className="list-card mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="font-14 mb-0 color-green"><span className="me-2"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="10" height="10" rx="5" fill="#689737" />
                                                        </svg>

                                                        </span>Completed</p>


                                                        <div className="company-logo-dropdown">
                                                            <div className="dropdown">
                                                                <button
                                                                    className="dropdown-toggle border-0 w-100 d-flex align-items-center"
                                                                    type="button" data-bs-toggle="dropdown"
                                                                    aria-expanded="false">
                                                                    <img src={ellipsis} alt='' />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end w-100 shadow">
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={eye} className="me-1" alt='' />View
                                                                    </Link></li>
                                                                    <li><Link className="dropdown-item" to="/"><img
                                                                        src={deletePic} className="me-1" alt='' />Delete</Link>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-14 my-3 color-para">Visual Graphic for Presentation to Client
                                                        For New Version as a feedback <Link data-bs-toggle="offcanvas" to="#offcanvasExample" role="button" aria-controls="offcanvasExample"
                                                            className="color-blue text-decoration-underline">Read More...</Link> </p>

                                                    <div className="d-flex align-items-center gap-3 list-card-user-profile">
                                                        <img src={image1} alt="" />
                                                        <p className="font-14 mb-0 body-sub-heading ">Created by: <span>Vipin
                                                            Pal</span></p>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end task-details-popup" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title font-18" id="offcanvasExampleLabel">Task Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="task_info">
                        <p>I still want the original header, but when you scroll to the left it right I want it to start to reveal the cards. Thank you for creating design first</p>
                        <p>Between the two, I like option 1 better. It looks like the restaurant slide is showing the restaurants top 2 items. That is a pretty good idea</p>
                        <p>I would want to remove the item description and only use 1 of those 2 lines that are being used for badges. I will only want one badge displayed at a time</p>
                        <p>In fact for right now, I want to only focus on the restaurant side carousel.</p>
                    </div>
                    <div className="task_attachment mt-30">
                        <h6 className="mb-3">ATTACHMENT</h6>
                        <div className="attachment-file">
                            <Link to="/" className="border"><img src={pdf} alt='' className="img-fluid" /></Link>
                            <Link to="/" className="border"><img src={image} alt='' className="img-fluid" /></Link>
                        </div>
                    </div>
                    <div className="task_attachment comments mt-30">
                        <h6 className="mb-3 d-flex align-items-center justify-content-between">COMMENTS <Link to="/" className="link_menu" data-bs-toggle="modal" data-bs-target="#exampleModal">Write Comments</Link></h6>
                        <div className="comment_list">
                            <div className="comments-people border-bottom d-flex gap-3">
                                <div className="people-name">RS</div>
                                <div className="people-message">
                                    <h5>Ravi Sharma | <span>11:00 AM</span></h5>
                                    <p>We have already made this task on yesterday. please check last updated file</p>
                                </div>
                            </div>
                            <div className="comments-people border-bottom d-flex gap-3">
                                <div className="people-name">AG</div>
                                <div className="people-message">
                                    <h5>Anurag Aggarwal | <span>04:00 PM</span></h5>
                                    <p>We have already made this task on yesterday. please check last updated file</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered comment_post">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Write Your Comment Here...</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" rows="4" placeholder="Please write your message..."></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn blue-btn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end task-details-popup" tabIndex="-1" id="offcanvasMilestone" aria-labelledby="offcanvasMilestoneLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title font-18" id="offcanvasMilestoneLabel">Milestones</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="milestones">
                        <strong>Milestone 1: </strong> Advance Payment for team allocation, project setup, design phase start.
                    </div>
                    <div className="milestones active">
                        <strong>Milestone 2: </strong> Mobile App screen designs, admin dashboard setup,
                    </div>
                    <div className="milestones">
                        <strong>Milestone 3: </strong> Workable iOS app coding for events creation, attendees, attendance status, admin features
                    </div>
                    <div className="milestones">
                        <strong>Milestone 4: </strong> Workable iOS app with remaining features and social setup.
                    </div>
                    <div className="milestones">
                        <strong>Milestone 5: </strong> Making the apps and admin panel live and fix the bugs.
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog task_delete modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="task_delete_option">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div className="task_message text-center">
                                    <div className="task_icon"><img src={deletePic} alt='' /></div>
                                    <h4>Delete Task</h4>
                                    <p>Are your sure you want to delete this task?</p>
                                </div>
                                <div className="task_button-group text-center">
                                    <button type="button" className="btn border_btn" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn blue-btn">Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetails