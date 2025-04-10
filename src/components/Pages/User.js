import React, { useEffect, useRef, useState } from 'react'
import '../css/custom.css'
import '../css/media.css'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { setPassChange, setSuccess } from '../features/successSlice';
import { updateUser } from '../features/userSlice'
import { getUsers }
  from '../features/apiSlice'
import Sideer from '../sider/Sideer'
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import Toast from 'react-bootstrap/Toast';
import ProgressBar from 'react-bootstrap/ProgressBar'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import UserForm from './Forms/UserForm';
import { Accordion } from 'react-bootstrap';


const User = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([]);
  const [editInd, setEditInd] = useState(null)
  const [editData, setEditData] = useState({})
  const [checkEdit, setCheckEdit] = useState(false)
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [deleteInd, setDeleteInd] = useState(null)
  const { data, isLoading, isError } = useSelector((state) => state.api)
  const fileUpdateRef = useRef(null);
  const [progressBars, setProgressBars] = useState(0)
  const [updateFile, setUpdateFile] = useState(null)
  const success = useSelector((state) => state.success.successMe);
  const successPass = useSelector((state) => state.success.successPass);

  const handleShowDelete = (ind) => {
    setShowDelete(true);
    setDeleteInd(ind)
  }

  const handleCloseDelete = () => setShowDelete(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = () => {
      const storedData = JSON.parse(localStorage.getItem("data")) || [];
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const filteredUsers = storedData.filter((u) => u.email !== user.email);
        setUserData(filteredUsers);
      } else {
        setUserData(storedData);
      }
    };

    fetchData();
  }, []);

  const handleImageClose = (val) => {
    if (fileUpdateRef.current) {
      document.getElementById('my-icon').style.display = 'none'
      fileUpdateRef.current.value = null
      setUpdateFile(null)
      setProgressBars(0)
    }
  }
  useEffect(() => {
    const storedSuccess = localStorage.getItem('success');
    const passwordChange = JSON.parse(localStorage.getItem("passChange"))
    if (storedSuccess === 'true') {
      dispatch(setSuccess(true));
      localStorage.removeItem('success');
    }

    if (passwordChange === 'true') {
      dispatch(setPassChange(true));
      localStorage.removeItem('passChange');
    }

    if (success) {
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 3000);
    }
    if (successPass) {
      setTimeout(() => {
        dispatch(setPassChange(false));
      }, 3000);
    }
  }, [success, successPass, dispatch]);

  const handleDelete = (ind) => {
    const updatedData = userData.filter((_, i) => i !== ind)
    setUserData(updatedData)
    handleCloseDelete()
    setDeleteInd(null)
    localStorage.setItem("data", JSON.stringify(updatedData))
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const validateEmail = (email) =>
    validateField(email, /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/, 'email-error');

  const validateAge = (age) => {
    const isValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 90
    document.getElementById('age-error').style.display = isValid ? 'none' : 'block';
    return isValid;
  };

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
    if (editData.subject.length === 0) {
      document.getElementById('subject-error').style.display = 'block';
      isValid = false;
    }
    return isValid;
  };

  const handleStatusChange = (ind, val) => {
    const updatedData = [...userData];
    updatedData[ind].status = val;
    setUserData(updatedData)
    localStorage.setItem("data", JSON.stringify(updatedData))
  }

  const handleEdit = (ind) => {
    handleShow()
    setCheckEdit(!checkEdit)
    setEditInd(ind)
    setEditData({ ...userData[ind] })
  }

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target

    if (updateFile !== null) {
      setEditData((prevData) => ({
        ...prevData,
        file: updateFile,
      }))
    }
    if (type === "checkbox") {
      setEditData((prevData) => ({
        ...prevData,
        subject: checked
          ? [...(prevData.subject), value]
          : (prevData.subject).filter((sub) => sub !== value),
      }));
    }
    else {
      console.log(name)
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleProfilePic = (val) => {
    const file = val.target.files[0]
    if (file) {
      document.getElementById('my-icon').style.display = 'block'
      const read = new FileReader()
      read.onloadend = () => {
        setUpdateFile(read.result)
      }
      const formData = new FormData()
      console.log('file', file)
      formData.append('file', file)
      // axios.post('http://localhost:3000/', formData, {
      // onUploadProgress: () => {
      progress(0)
      // }
      // })
      read.readAsDataURL(file)
    }
  };

  const handleSaveImage = () => {
    const users = JSON.parse(localStorage.getItem('data')) || [];
    const user = users.filter((obj) =>
      obj.email === editData.email)
    const filteredUser = users.find((u) => u.email === editData.email);
    console.log("filteredUser.file ", filteredUser.file);
    filteredUser.file = updateFile
    console.log("filteredUsers ", filteredUser);
    user.push(filteredUser)
    console.log("users ", user);
    localStorage.setItem('data', JSON.stringify(users));
  }

  const progress = function (sec) {
    let interval = 150;
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

  const handleSave = (e) => {
    e.preventDefault()
    if (validateUserName(editData.username) &&
      validateEmail(editData.email) &&
      validateAge(editData.age) &&
      validateRequiredFields()
    ) {
      editData.index = editInd;
      dispatch(updateUser(editData));
      if (updateFile) {
        handleSaveImage()
        setProgressBars(0)
      }
      setShow(false);
      setEditInd(null);
      setEditData({});
    }
  }

  const validateLocalEmail = (email) => {
    const duplicateEmailCheck = document.getElementById('duplicate-error');
    const user = JSON.parse(localStorage.getItem('data')) || [];
    const emailExist = user.some((obj) => obj.email === email);
    duplicateEmailCheck.style.display = emailExist ? 'block' : 'none';
    return emailExist;
  };

  const genderOptions = ["Male", "Female", "Other"]

  const checkOption = [
    { name: 'Physics ', key: 'physics', label: 'Physics ' },
    { name: 'Chemistry ', key: 'chemistry', label: 'Chemistry ' },
    { name: 'Math ', key: 'math', label: 'Math ' },
    { name: 'Biology ', key: 'bio', label: 'Biology ' },
  ];

  const validateField = (field, regex, errorId) => {
    const isValid = regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  function toasterMessage() {

    return (
      <>
        <Toast style={{ background: '#D0F0C0', marginLeft: '1000px', position: 'absolute', zIndex: '1' }} onClose={() => dispatch(setSuccess(false))} delay={3000} autohide>
          <Toast.Body>You have Successfully LoggedIn.</Toast.Body>
        </Toast>
      </>
    );
  }

  const validateUserName = (username) =>
    validateField(username, /^[a-z0-9]+$/i, 'username-error');

  return (
    <>
      <div className="main_container">
        <div style={{ marginTop: '0px', zIndex: '1' }}>-{success && toasterMessage()}</div>
        <div className="limani_body">
          <Sideer />
          <div className="intersight_content">
            <div className="body_content">
              <Header />
              <div className="contact-profile" >
                <div className="row">
                  {userData.length > 0 ? (userData.map((user, ind) => (
                    <div key={ind} id='for-search' className="col-lg-6 mb-3" >
                      <div className="professional_info">
                        <div className="project-card-top">
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <div className="body_heading2 mb-0 ">
                              <div className='d-flex'>
                                <h2 className="font-18 mb-0"><span className="me-2"><img src={user.file} style={{ maxWidth: "30px", }} alt="" /></span>{user.username}</h2>
                                <span className=''>
                                  <button className="dropdown-toggle border-0 w-0 d-flex align-items-center" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                  </button>
                                  <ul className="dropdown-menu w-100">
                                    <li>
                                      <span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => handleEdit(ind)}>Update</span></li>
                                    <li><span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => handleShowDelete(ind)}>Delete</span></li>
                                  </ul>
                                </span>
                              </div>
                              <p className="mb-0 body-sub-heading font-12">Created by:- <span>{user.email}</span></p>
                            </div>
                            <p className="mb-0 font-14 body-sub-heading ">Gender: <span> {user.gender}</span> </p>
                          </div>
                          <div className="project-card-heading technology-heading d-flex align-items-center justify-content-between">
                            <p className="my-2 font-14 body-sub-heading ">Stream: <span> {user.stream}</span></p>
                            <p className="my-2 font-14 body-sub-heading ">Age: <span>{user.age}</span>  </p>
                          </div>

                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <p className="my-2 font-14 body-sub-heading ">Subjects: <span> {user.subject.join(", ")}</span></p>
                            <p className="my-2 font-14 body-sub-heading ">Status <span><select
                              value={user.status || "Active"}
                              onChange={(e) => handleStatusChange(ind, e.target.value)}
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select> </span> </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                  )) : (<h1>No data found</h1>)}
                </div >
                <div>
                <Accordion defaultActiveKey="0" className="row">
                  {data.length > 0 ? (data.map((user, ind) => (

                    <Accordion.Item eventKey={ind} key={ind} id='for-search' className="col-lg-6 mb-3" >
                      
                      <div className="professional_info">
                        <div className="project-card-top">
                        <Accordion.Header>
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <div className="body_heading2 mb-0 ">
                              <div className='d-flex'>

                                <h2 className="font-18 mb-0"><span className="me-2"><img src='https://avatar.iran.liara.run/public' style={{ maxWidth: "30px", }} alt="" /></span>{user.username}</h2>
                              </div>
                              <p className="mb-0 body-sub-heading font-12">Created by:- <span>{user.email}</span></p>
                            </div>
                            <p className="mb-0 font-14 body-sub-heading ">Name: <span> {user.name}</span> </p>

                          </div>
                          </Accordion.Header>
                          <Accordion.Body>
                          <div className="project-card-heading technology-heading d-flex align-items-center justify-content-between">
                            <p className="my-2 font-14 body-sub-heading ">Suite: <span className="me-2">{user.address.suite}
                            </span></p>
                            <p className="my-2 font-14 body-sub-heading ">City: <span> {user.address.city}</span></p>
                            <p className="my-2 font-14 body-sub-heading ">Street: <span>{user.address.street}</span>  </p>
                          </div>
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <p className="my-2 font-14 body-sub-heading ">ZipCode: <span className="me-2"> {user.address.zipcode}</span></p>
                            <p className="my-2 font-14 body-sub-heading ">Lat. <span>{user.address.geo.lat}</span> </p>
                            <p className="my-2 font-14 body-sub-heading ">Lng. <span>{user.address.geo.lng}</span> </p>

                          </div>
                          </Accordion.Body>
                        </div>
                      </div>
                    </Accordion.Item>
                  )
                  )) : isLoading ? <h5 style={{ textAlign: 'center' }}>Loading...</h5> : <h5 style={{ textAlign: 'center' }}>{'some thing wents wrong' || isError}</h5>}
                  </Accordion>
                  <UserForm />
                </div>


                {editInd !== null && (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className='row'>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                          >
                            <Form.Control
                              type='text' name="username" value={editData.username} onChange={handleChange} placeholder='Enter Username' minLength={6} maxLength={20}
                            />
                            <span id='username-error' style={{ display: "none", color: 'red' }}>Enter valid username</span>
                          </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Select Gender"
                            className="mb-3"
                          >

                            <Form.Select name="gender" value={editData.gender || ""} onChange={handleChange}>
                              <option value="">Select</option>
                              {genderOptions.map((val, ind) => (
                                <option key={ind} value={val}>
                                  {val}
                                </option>
                              ))}
                            </Form.Select>
                            <span id='gender-error' style={{ display: 'none', color: 'red' }}>Select your gender</span>
                          </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Age"
                            className="mb-3"
                          >
                            <Form.Control
                              type='text' name="age" value={editData.age} onChange={handleChange} onInput={validateAge}
                            />
                            <span id='age-error' style={{ display: 'none', color: 'red' }}>Age must be greater than 16 and less than 90</span>
                          </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                          >
                            <Form.Control
                              type='text' name="email" value={editData.email} onChange={handleChange} onInput={(e) => validateLocalEmail(e.target.value)}
                            />
                            <span id='email-error' style={{ display: "none", color: 'red' }}>Enter valid Email</span>
                            <span id='duplicate-error' style={{ display: "none", color: 'red' }}>Email already exist</span>
                          </FloatingLabel>
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
                                  checked={(editData.subject).includes(it.label)}
                                  onChange={handleChange}
                                />
                              </label>
                            ))}

                            <span id='subject-error' style={{ display: 'none', color: 'red' }}>Select at least one subject</span>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Profile photo</Form.Label>
                            <Form.Control
                              type='file' ref={fileUpdateRef} onChange={handleProfilePic}
                            />

                            <div style={{ position: 'relative' }}>
                              <ProgressBar variant={progressBars === 100 ? 'success' : 'info'} id='progress-bar' animated now={progressBars} label={`${progressBars}%`} style={{ width: '97%', margin: '5px', display: progressBars === 0 ? 'none' : 'block' }} />
                              <span onClick={handleImageClose} id='my-icon' className="close AClass" style={{ position: 'absolute', cursor: 'pointer', fontSize: '25px', display: 'none' }} >&times;</span>
                              <img alt='' src={updateFile ? updateFile : editData.file} style={{ maxWidth: "154px" }} />
                            </div>
                          </Form.Group>
                        </div>


                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        Save Changes
                      </Button>

                    </Modal.Footer>
                  </Modal>)}


                <Modal show={showDelete} onHide={handleCloseDelete} className='modalSize'
                  size='md'
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Are you sure want to delete!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                      No
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(deleteInd)}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>

              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default User

// solve isssues in loggidin user data edit, image upload null error, validation , error checks (span)