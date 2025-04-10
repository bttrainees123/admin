import React, { useEffect, useState } from 'react'

import logo2 from "../image/BT-logo2.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { checkOption, genderOptions, validateAge, validateEmail, validateLocalEmail, validateUserName } from '../utils/validation';
import { updateLoggedInUser } from '../features/userSlice';
import { isAuthenticated } from '../features/authSlice';
const Sideer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState('');
  const [show, setShow] = useState(false);
  const [passShow, setPassShow] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkEdit, setCheckEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const [userData, setUserData] = useState([]);
  const [showDelete, setShowDelete] = useState(false)
  const [updateFile, setUpdateFile] = useState(null)
  const [progressBars, setProgressBars] = useState(0)


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    setUserData(storedData);

  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
  }, [dispatch, editData])

  const handleShowLogout = () => {
    setShowDelete(true);
  }


  const handleProfilePic = (val) => {
    const file = val.target.files[0]
    if (file) {
      const read = new FileReader()
      read.onloadend = () => {
        setUpdateFile(read.result)
        console.log("UpdateFile ", updateFile);

      }
      const formData = new FormData()
      console.log('file', file)
      formData.append('file', file)
      // axios.post('http://localhost:3000', formData, {
      // onUploadProgress: (val) => {
      progress(0)
      // }
      // })
      read.readAsDataURL(file)
    }
  };

  const progress = function (sec) {
    let interval = 200;
    setTimeout(function () {
      console.log("sec ", sec);
      if (sec < 90) {
        sec = sec + 10;
      }
      else {
        sec = sec + 1;
      }
      setProgressBars(sec)
      if (sec < 100)
        progress(sec);
    }, interval)
  }

  const validateRequiredFields = () => {
    let isValid = true;
    if (!editData.gender) {
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    }
    if (!editData.stream) {
      document.getElementById('stream-error').style.display = 'block';
      isValid = false;
    }
    if (editData.subject && editData.subject.length === 0) {
      document.getElementById('subject-error').style.display = 'block';
      isValid = false;
    }
    return isValid;
  };


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const handleCloseDelete = () => setShowDelete(false);


  const handlePassClose = () => setPassShow(false);
  const handlePassShow = () => setPassShow(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    document.getElementById('password-error').style.display = 'none';
  };

  const handleEdit = () => {
    const filteredUser = userData.find((u) => u.email === loggedInUser.email);

    console.log("filteredUsers ", filteredUser);

    setEditData(filteredUser)
    console.log("editData", editData);
    setCheckEdit(true)
    handleShow()

  }

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleClearPass = () => {
    setPassword("")
    setConfirmPassword("")
  }

  const validateField = (field, regex, errorId) => {
    const isValid = regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
  };


  const comparePassword = (password, confirmPassword) => {
    const isValid = password === confirmPassword;
    document.getElementById('cPassword-error').style.display = isValid ? 'none' : 'block';
    return isValid;
  };


  const validatePassword = (password) =>
    validateField(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password-error');

  const handleConfirmPasswordChange = (val) => {
    setConfirmPassword(val.target.value);
    document.getElementById('cPassword-error').style.display = 'none';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      setEditData((prevData) => ({
        ...prevData,
        subject: checked
          ? [...(prevData.subject), value]
          : (prevData.subject).filter((sub) => sub !== value),
      }));
    }
    else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (validateUserName(editData.username) &&
      validateEmail(editData.email) &&
      validateAge(editData.age) &&
      validateRequiredFields()
    ) {
      dispatch(updateLoggedInUser(editData));
      dispatch(isAuthenticated(editData))
      if (updateFile) {
        handleSaveImage()
        setProgressBars(0)
      }
      setCheckEdit(false)
      setShow(false);

      setEditData({});

    }
  }



  const handleSaveImage = () => {
    const users = JSON.parse(localStorage.getItem('data')) || [];
    const user = users.filter((obj) =>
      obj.email === loggedInUser.email)
    const filteredUser = users.find((u) => u.email === loggedInUser.email);
    console.log("filteredUser.file ", filteredUser.file);

    filteredUser.file = updateFile
    console.log("filteredUsers ", filteredUser);
    user.push(filteredUser)
    console.log("users ", user);
    localStorage.setItem('data', JSON.stringify(users));
    dispatch(isAuthenticated(filteredUser))
    handleClearPass()
    handlePassClose()
  }

  const handleSavePassword = () => {
    if (validatePassword(password) && comparePassword(password, confirmPassword)) {
      const users = JSON.parse(localStorage.getItem('data')) || [];
      const user = users.filter((obj) =>
        obj.email === loggedInUser.email)
      const filteredUser = users.find((u) => u.email === loggedInUser.email);
      filteredUser.password = password
      console.log("filteredUsers ", filteredUser);
      user.push(filteredUser)
      console.log("users ", users);
      localStorage.setItem('data', JSON.stringify(users));
      handleClearPass()
      handlePassClose()
    }
  }



  return (
    <div className="intersight_menu">

      <div className="top_menu">
        <div className="brand">
          <div className="dropdown">
            <NavLink exact activeClassName="active" to='/'>
              <button className="dropdown-toggle border-0 w-100 d-flex align-items-center" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span className="d-flex align-items-center justify-content-center">
                  <img src={logo2} alt="" srcSet="" />
                </span> Brain Technosys PMS

              </button>
            </NavLink>
          </div>
        </div>
        <div className="intersight_home">
          <div className="menu_div">
            <ul>
              <li><NavLink exact activeClassName="active" to='/dashboard'>
                <span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.5 16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V7.76166C2.49995 7.63578 2.52842 7.51153 2.58326 7.39823C2.63811 7.28493 2.71791 7.18553 2.81667 7.10749L9.48333 1.84832C9.63046 1.73206 9.81249 1.66882 10 1.66882C10.1875 1.66882 10.3695 1.73206 10.5167 1.84832L17.1833 7.10666C17.2822 7.18478 17.3621 7.28432 17.4169 7.39777C17.4718 7.51123 17.5002 7.63564 17.5 7.76166V16.6667ZM5.83333 9.99999C5.83333 11.1051 6.27232 12.1649 7.05372 12.9463C7.83512 13.7277 8.89493 14.1667 10 14.1667C11.1051 14.1667 12.1649 13.7277 12.9463 12.9463C13.7277 12.1649 14.1667 11.1051 14.1667 9.99999H12.5C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 9.99999H5.83333Z"
                      fill="black" />
                  </svg>
                </span> Dashboard</NavLink>
              </li>
              <li className="without_label">Workspace</li>
              {/* {loggedInUser.role === 'Editor' && ( */}
              <li><NavLink exact activeClassName="active" to="/users">
                <span >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.5H16V5.5C16 4.70435 15.6839 3.94129 15.1213 3.37868C14.5587 2.81607 13.7956 2.5 13 2.5H11C10.2044 2.5 9.44129 2.81607 8.87868 3.37868C8.31607 3.94129 8 4.70435 8 5.5V6.5H5C4.20435 6.5 3.44129 6.81607 2.87868 7.37868C2.31607 7.94129 2 8.70435 2 9.5V18.5C2 19.2956 2.31607 20.0587 2.87868 20.6213C3.44129 21.1839 4.20435 21.5 5 21.5H19C19.7956 21.5 20.5587 21.1839 21.1213 20.6213C21.6839 20.0587 22 19.2956 22 18.5V9.5C22 8.70435 21.6839 7.94129 21.1213 7.37868C20.5587 6.81607 19.7956 6.5 19 6.5ZM10 5.5C10 5.23478 10.1054 4.98043 10.2929 4.79289C10.4804 4.60536 10.7348 4.5 11 4.5H13C13.2652 4.5 13.5196 4.60536 13.7071 4.79289C13.8946 4.98043 14 5.23478 14 5.5V6.5H10V5.5ZM20 18.5C20 18.7652 19.8946 19.0196 19.7071 19.2071C19.5196 19.3946 19.2652 19.5 19 19.5H5C4.73478 19.5 4.48043 19.3946 4.29289 19.2071C4.10536 19.0196 4 18.7652 4 18.5V13C4.97544 13.3869 5.97818 13.7011 7 13.94V14.53C7 14.7952 7.10536 15.0496 7.29289 15.2371C7.48043 15.4246 7.73478 15.53 8 15.53C8.26522 15.53 8.51957 15.4246 8.70711 15.2371C8.89464 15.0496 9 14.7952 9 14.53V14.32C9.99435 14.4554 10.9965 14.5255 12 14.53C13.0035 14.5255 14.0057 14.4554 15 14.32V14.53C15 14.7952 15.1054 15.0496 15.2929 15.2371C15.4804 15.4246 15.7348 15.53 16 15.53C16.2652 15.53 16.5196 15.4246 16.7071 15.2371C16.8946 15.0496 17 14.7952 17 14.53V13.94C18.0218 13.7011 19.0246 13.3869 20 13V18.5ZM20 10.81C19.0274 11.2205 18.0244 11.5548 17 11.81V11.5C17 11.2348 16.8946 10.9804 16.7071 10.7929C16.5196 10.6054 16.2652 10.5 16 10.5C15.7348 10.5 15.4804 10.6054 15.2929 10.7929C15.1054 10.9804 15 11.2348 15 11.5V12.24C13.0113 12.54 10.9887 12.54 9 12.24V11.5C9 11.2348 8.89464 10.9804 8.70711 10.7929C8.51957 10.6054 8.26522 10.5 8 10.5C7.73478 10.5 7.48043 10.6054 7.29289 10.7929C7.10536 10.9804 7 11.2348 7 11.5V11.83C5.97562 11.5748 4.9726 11.2405 4 10.83V9.5C4 9.23478 4.10536 8.98043 4.29289 8.79289C4.48043 8.60536 4.73478 8.5 5 8.5H19C19.2652 8.5 19.5196 8.60536 19.7071 8.79289C19.8946 8.98043 20 9.23478 20 9.5V10.81Z" fill="black" />
                  </svg>

                </span> User List</NavLink>
              </li>
              {/* )} */}
              {loggedInUser.role === 'Editor' && (<li><NavLink exact activeClassName="active" to="/html-react">
                <span >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 1.66667H16.6667C16.8877 1.66667 17.0996 1.75446 17.2559 1.91074C17.4122 2.06702 17.5 2.27899 17.5 2.5V17.5C17.5 17.721 17.4122 17.933 17.2559 18.0893C17.0996 18.2455 16.8877 18.3333 16.6667 18.3333H3.33333C3.11232 18.3333 2.90036 18.2455 2.74408 18.0893C2.5878 17.933 2.5 17.721 2.5 17.5V2.5C2.5 2.27899 2.5878 2.06702 2.74408 1.91074C2.90036 1.75446 3.11232 1.66667 3.33333 1.66667H5.83333V0H7.5V1.66667H12.5V0H14.1667V1.66667ZM5.83333 6.66667V8.33333H14.1667V6.66667H5.83333ZM5.83333 10V11.6667H14.1667V10H5.83333Z" fill="black" />
                  </svg>

                </span> Editor</NavLink>
              </li>)}

              <li><NavLink exact activeClassName="active" to="/company-list">
                <span >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 1.66667H16.6667C16.8877 1.66667 17.0996 1.75446 17.2559 1.91074C17.4122 2.06702 17.5 2.27899 17.5 2.5V17.5C17.5 17.721 17.4122 17.933 17.2559 18.0893C17.0996 18.2455 16.8877 18.3333 16.6667 18.3333H3.33333C3.11232 18.3333 2.90036 18.2455 2.74408 18.0893C2.5878 17.933 2.5 17.721 2.5 17.5V2.5C2.5 2.27899 2.5878 2.06702 2.74408 1.91074C2.90036 1.75446 3.11232 1.66667 3.33333 1.66667H5.83333V0H7.5V1.66667H12.5V0H14.1667V1.66667ZM5.83333 6.66667V8.33333H14.1667V6.66667H5.83333ZM5.83333 10V11.6667H14.1667V10H5.83333Z" fill="black" />
                  </svg>

                </span> Company List</NavLink>
              </li>
              <li><NavLink exact activeClassName="active" to="/extract-text">
                <span >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 1.66667H16.6667C16.8877 1.66667 17.0996 1.75446 17.2559 1.91074C17.4122 2.06702 17.5 2.27899 17.5 2.5V17.5C17.5 17.721 17.4122 17.933 17.2559 18.0893C17.0996 18.2455 16.8877 18.3333 16.6667 18.3333H3.33333C3.11232 18.3333 2.90036 18.2455 2.74408 18.0893C2.5878 17.933 2.5 17.721 2.5 17.5V2.5C2.5 2.27899 2.5878 2.06702 2.74408 1.91074C2.90036 1.75446 3.11232 1.66667 3.33333 1.66667H5.83333V0H7.5V1.66667H12.5V0H14.1667V1.66667ZM5.83333 6.66667V8.33333H14.1667V6.66667H5.83333ZM5.83333 10V11.6667H14.1667V10H5.83333Z" fill="black" />
                  </svg>

                </span> Extract Text</NavLink>
              </li>
              {loggedInUser.role === 'Editor' && (<li><NavLink exact activeClassName="active" to="/products">
                <span >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 1.66667H16.6667C16.8877 1.66667 17.0996 1.75446 17.2559 1.91074C17.4122 2.06702 17.5 2.27899 17.5 2.5V17.5C17.5 17.721 17.4122 17.933 17.2559 18.0893C17.0996 18.2455 16.8877 18.3333 16.6667 18.3333H3.33333C3.11232 18.3333 2.90036 18.2455 2.74408 18.0893C2.5878 17.933 2.5 17.721 2.5 17.5V2.5C2.5 2.27899 2.5878 2.06702 2.74408 1.91074C2.90036 1.75446 3.11232 1.66667 3.33333 1.66667H5.83333V0H7.5V1.66667H12.5V0H14.1667V1.66667ZM5.83333 6.66667V8.33333H14.1667V6.66667H5.83333ZM5.83333 10V11.6667H14.1667V10H5.83333Z" fill="black" />
                  </svg>

                </span> Products List</NavLink>
              </li>)}
            </ul>
            <div className="bottom_menu">
              <p className="">Looking for something? <Link to="/" className="d-block text-decoration-underline">Help
                & Support</Link></p>
              <div className="user_person">
                <div className="dropdown">
                  <button className="dropdown-toggle border-0 w-100 d-flex align-items-center" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="d-flex align-items-center justify-content-center person_icon"><img
                      src={loggedInUser.file} style={{ maxWidth: "42px", }} alt="" /></span>
                    <label className="person_name">
                      {loggedInUser.username}<span className="d-block">{loggedInUser.email}</span>
                    </label>
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li><Link className="dropdown-item" onClick={handleEdit}>Profile</Link></li>
                    <li><Link className="dropdown-item" onClick={handlePassShow}>Change Password</Link></li>
                    <li><Link className="dropdown-item" onClick={handleShowLogout}>Logout</Link></li>
                  </ul>
                </div>
              </div>
              <div>


                <div>


                  <Modal show={passShow} onHide={handlePassClose} className='modalSize'
                    size='md'
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">Change you password here
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type='text' value={password} onChange={handlePasswordChange} onInput={validatePassword}
                          />
                          <span id='password-error' style={{ display: "none", color: 'red' }}>Enter valid password</span>
                        </Form.Group>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type='text' name='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} onInput={comparePassword}
                          />
                          <span id='cPassword-error' style={{ display: "none", color: 'red' }}>password and confirm password not matched</span>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleSavePassword}>
                        Change password
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showDelete} onHide={handleCloseDelete} className='modalSize'
                    size='md'
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">Are you sure want to logout!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                        No
                      </Button>
                      <Button variant="danger" onClick={handleLogout}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {checkEdit && (<Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className='row'>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type='text' name="username" value={editData.username || ""} onChange={handleChange} placeholder='Enter Username' minLength={6} maxLength={20}
                          />
                          <span id='username-error' style={{ display: "none", color: 'red' }}>Enter valid username</span>
                        </Form.Group>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <Form.Label>Select Gender</Form.Label>

                          <Form.Select name="gender" value={editData.gender || ""} onChange={handleChange}>
                            <option value="">Select</option>
                            {genderOptions.map((val, ind) => (
                              <option key={ind} value={val}>
                                {val}
                              </option>
                            ))}
                          </Form.Select>
                          <span id='gender-error' style={{ display: 'none', color: 'red' }}>Select your gender</span>
                        </Form.Group>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type='text' name="age" value={editData.age} onChange={handleChange} onInput={validateAge}
                          />
                          <span id='age-error' style={{ display: 'none', color: 'red' }}>Age must be greater than 16 and less than 90</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type='text' name="email" value={editData.email} onChange={handleChange} onInput={(e) => validateLocalEmail(e.target.value)}
                          />
                          <span id='email-error' style={{ display: "none", color: 'red' }}>Enter valid Email</span>
                          <span id='duplicate-error' style={{ display: "none", color: 'red' }}>Email already exist</span>
                        </Form.Group>
                        <div className='row'>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Stream</Form.Label>
                            <Form.Label>
                              <input
                                type="radio"
                                name="stream"
                                value="PCM"
                                checked={editData.stream === "PCM"}
                                onChange={handleChange}
                              />
                              PCM
                            </Form.Label>
                            <Form.Label>
                              <input
                                type="radio"
                                name="stream"
                                value="Commerce"
                                checked={editData.stream === "Commerce"}
                                onChange={handleChange}
                              />
                              Commerce
                            </Form.Label>
                            <Form.Label>
                              <input
                                type="radio"
                                name="stream"
                                value="Arts"
                                checked={editData.stream === "Arts"}
                                onChange={handleChange}
                              />
                              Arts
                            </Form.Label>
                            <span id='stream-error' style={{ display: 'none', color: 'red' }}>Select a stream</span>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='label-me'>Subjects: </Form.Label>
                            {checkOption.map((it) => (
                              <label key={it.key}>
                                {it.label}
                                <input
                                  type="checkbox"
                                  name={it.name}
                                  value={it.label}
                                  checked={(editData.subject) ? (editData.subject).includes(it.label) : ''}
                                  onChange={handleChange}
                                />
                              </label>
                            ))}

                            <span id='subject-error' style={{ display: 'none', color: 'red' }}>Select at least one subject</span>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Profile photo</Form.Label>
                            <Form.Control
                              type='file'
                              onChange={handleProfilePic}
                            />
                            <ProgressBar variant={progressBars === 100 ? 'success' : 'info'} id='progress-bar' animated now={progressBars} label={`${progressBars}%`} style={{ width: '97%', margin: '5px', display: progressBars === 0 ? 'none' : 'block' }} />

                            <div style={{ position: 'relative' }}>
                              <img alt='' src={updateFile ? updateFile : editData.file} style={{ maxWidth: "154px" }} />
                            </div>
                          </Form.Group>
                        </div>


                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                      </Button>
                      <Button variant="danger" onClick={handleSave}>
                        Update
                      </Button>
                    </Modal.Footer>
                  </Modal>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sideer