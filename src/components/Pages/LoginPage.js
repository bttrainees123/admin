import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../css/custom.css'
import '../css/media.css'

import logo from '../image/BT-logo.png'
import correct from '../image/correct.png'
import { useDispatch } from 'react-redux'
import { isAuthenticated } from '../features/authSlice'
import { setSuccess } from '../features/successSlice'

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const navigate = useNavigate()

  const dispatch = useDispatch()

  // console.log("User", JSON.parse(localStorage.getItem('isLoggedIn'))); // console.log("set", typeof(localStorage.getItem('isLoggedIn')));

  const validateField = (field, regex, errorId) => { const isValid = regex.test(field); document.getElementById(errorId).style.display = isValid ? 'none' : 'block'; return isValid; };

  const validateEmail = (email) => validateField(email, /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,6}$/, 'email-error');

  const validatePassword = (password) => validateField(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password-error');

  const loginHandler = (e) => {
    e.preventDefault(); let emailCheck = false; let passwordCheck = false;
    const users = JSON.parse(localStorage.getItem('data'));

    if (validateEmail(email) && validatePassword(password)) {
      users?.forEach((val) => {
        if (val.email === email) {
          emailCheck = true;
        }
        if (val.password === password) {
          passwordCheck = true;
        }
        if (val.email === email && val.password === password) {
          const isUser = {
            username: val.username,
            email,
            file: val.file,
            gender: val.gender,
            stream: val.stream,
            age: val.age,
            subject: val.subject
          }
          dispatch(isAuthenticated(isUser))
          dispatch(setSuccess(true));
          // localStorage.setItem('isLoggedIn', 'true');
          // localStorage.setItem('user', JSON.stringify(val));
          navigate('/dashboard');
        }
      });

      document.getElementById('email-check').style.display = emailCheck ? 'none' : 'block';
      document.getElementById('password-check').style.display = passwordCheck ? 'none' : 'block';
    }
  };

  return (
    <section className="sign_in p-0">
      <div className="container-fluid">

        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="inner_content_one">
              <h1>Sign In</h1>
              <h2>Welcome!</h2>

              <form action="" className="form_sec mt-5" onSubmit={loginHandler}>
                <div className="row">
                  <div className="col-lg-12 mb-lg-4 mb-md-4 mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label form-label-custom">Email</label>
                    <input type="text" className="form-control form-control-custom" id="exampleInputPassword1"
                      placeholder="abc12@gmail.com" onChange={e => setEmail(e.target.value)} />
                  </div>
                  <span id='email-error' style={{ display: 'none', color: 'red' }}>Enter valid Email</span>
                  <span id='email-check' style={{ display: 'none', color: 'red' }}>Incorrect Email</span>
                  <div className="col-lg-12">
                    <div className="position-relative password_svg">
                      <label htmlFor="exampleInputPassword1" className="form-label form-label-custom">Password</label>
                      <input type={showPassword ? "text" : "password"} className="form-control form-control-custom" id="exampleInputPassword1"
                        placeholder="********" onChange={e => setPassword(e.target.value)} />
                      {showPassword ? (<svg onClick={() => setShowPassword((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 24 24" fill="none">
                        <g clipPath="url(#clip0_2056_26496)">
                          <path
                            d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"
                            fill="#7E7E7E"></path>
                        </g>
                        <defs>
                          <g clipPath="url(#clip0_2056_26496)">
                            <rect width="24" height="24" fill="white"></rect>
                          </g>
                        </defs>
                      </svg>) : (<svg onClick={() => setShowPassword((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                        <path d="M9.99999 13.0001C7.62968 13.0001 5.71093 11.1654 5.53437 8.84039L2.25624 6.30696C1.82531 6.84758 1.42874 7.41914 1.10874 8.04414C1.03726 8.18555 1.00001 8.34179 1.00001 8.50024C1.00001 8.65869 1.03726 8.81492 1.10874 8.95633C2.80343 12.2629 6.15843 14.5001 9.99999 14.5001C10.8409 14.5001 11.6522 14.3751 12.4341 14.1732L10.8125 12.9185C10.5447 12.9703 10.2727 12.9976 9.99999 13.0001ZM19.8069 14.8157L16.3522 12.1457C17.4016 11.2613 18.2647 10.177 18.8912 8.95602C18.9627 8.81461 19 8.65838 19 8.49993C19 8.34147 18.9627 8.18524 18.8912 8.04383C17.1966 4.73727 13.8416 2.50008 9.99999 2.50008C8.39109 2.50203 6.80831 2.90707 5.39624 3.67821L1.42062 0.605395C1.36878 0.565053 1.30949 0.535323 1.24615 0.517902C1.18282 0.500482 1.11667 0.495713 1.05149 0.503868C0.986304 0.512023 0.923369 0.532942 0.866275 0.56543C0.809182 0.597917 0.75905 0.641337 0.718743 0.693207L0.105306 1.48289C0.0239305 1.58758 -0.0125333 1.7203 0.0039342 1.85186C0.0204017 1.98342 0.088452 2.10306 0.193118 2.18446L18.5794 16.3948C18.6312 16.4351 18.6905 16.4648 18.7538 16.4823C18.8172 16.4997 18.8833 16.5045 18.9485 16.4963C19.0137 16.4881 19.0766 16.4672 19.1337 16.4347C19.1908 16.4022 19.2409 16.3588 19.2812 16.307L19.895 15.5173C19.9763 15.4125 20.0127 15.2798 19.9962 15.1482C19.9797 15.0167 19.9116 14.8971 19.8069 14.8157ZM14.0656 10.3782L12.8375 9.42883C12.9409 9.12992 12.9958 8.81636 13 8.50008C13.0061 8.03704 12.9035 7.57902 12.7005 7.16281C12.4975 6.74661 12.1996 6.38382 11.831 6.10359C11.4623 5.82336 11.0331 5.63349 10.5777 5.54925C10.1223 5.46501 9.65358 5.48873 9.20906 5.61852C9.3975 5.87386 9.49943 6.18273 9.49999 6.50008C9.49533 6.60569 9.47919 6.71047 9.45187 6.81258L7.15156 5.03477C7.95061 4.36702 8.95866 4.00085 9.99999 4.00008C10.591 3.99975 11.1763 4.11592 11.7225 4.34195C12.2686 4.56798 12.7648 4.89944 13.1827 5.31737C13.6006 5.7353 13.9321 6.2315 14.1581 6.77762C14.3841 7.32373 14.5003 7.90904 14.5 8.50008C14.5 9.17602 14.3347 9.80602 14.0656 10.3785V10.3782Z" fill="#828282"></path>
                      </svg>)}

                    </div>
                    <span id='password-error' style={{ display: "none", color: 'red' }}>Enter valid password</span>
                    <span id='password-check' style={{ display: "none", color: 'red' }}>Incorrect Password</span>
                    <div className="d-flex align-items-center justify-content-between remember_div mt-30 mb-30">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Remember me
                        </label>
                      </div>
                      <Link to="forget-password.html" className="link_forget">Forgot Password?</Link>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-lg-4 mb-md-4 mb-3">
                    <button type='submit' className="btn blue-btn w-100 text-uppercase">Sign In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 gradient_bg h_100vh">
            <div className="inner_content_two">
              <Link to="/" className="">
                <img src={logo} className="img-fluid" alt="" />
              </Link>
              <div className="line_height_24">
                <h2 className="login-right-heading  mb_16">
                  Flexible & Powerful Project Management Tool For BT Team
                </h2>
                <p className="para_18 my-3">
                  Scrum and Kanban boards help agile teams turn large complex projects into manageable pieces of work and
                  ship faster.
                </p>
                <div className="mt-5">
                  <div className="d-flex gap-3 mb-3">
                    <span><img src={correct} alt="" /></span>
                    <p className="para_18">
                      Powerful agile boards
                    </p>
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span><img src={correct} alt="" /></span>
                    <p className="para_18">
                      Reports and insights:
                    </p>
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span><img src={correct} alt="" /></span>
                    <p className="para_18">
                      No training or maintenance needed
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default LoginPage