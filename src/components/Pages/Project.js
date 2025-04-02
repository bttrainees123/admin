import React, { useEffect, useState } from 'react'
import '../css/custom.css'
import '../css/media.css'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccess } from '../features/successSlice';
import { updateUser } from '../features/userSlice'
import { getUsers }
  from '../features/apiSlice'
import Sideer from '../sider/Sideer'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import axios from '../utils/middlewares';
import { moment } from 'moment'

const Project = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData, setUserData] = useState([]);
  const [editInd, setEditInd] = useState(null)
  const [editData, setEditData] = useState({})
  const [checkEdit, setCheckEdit] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('');
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [deleteInd, setDeleteInd] = useState(null)
  // const [currPage, setCurrPage] = useState([])
  const { data, isLoading, isError } = useSelector((state) => state.api)
  // const [success, setSuccess] = useState(false)
  // const [editUser, setEditUser] = useState({})
  // const { username, ImgFile } = useSelector((state) => state.users)
  const [date, setDate] = useState(new Date());
  const [value, onChange] = useState(new Date());
  const [apiData, setApiData] = useState([])
  // type ValuePiece = Date | null;

  // const Value = ValuePiece | [ValuePiece, ValuePiece];

  // const [value, onChange] = useState(new Date());
  // const pageLimit = 2;

  const handleShowDelete = (ind) => {
    setShowDelete(true);
    setDeleteInd(ind)
  }

  // function FullCalendarComponent() {
  // const handleDateClick = (arg) => {
  //   alert(arg.dateStr);
  // };


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
        setLoggedInUser(user);
        const filteredUsers = storedData.filter((u) => u.email !== user.email);
        setUserData(filteredUsers);
      } else {
        setUserData(storedData);
      }
    };

    fetchData();
  }, []);

  // const calenderShow = () => {
  //   return (
  //     <div>
  //       <Calendar onChange={onChange} value={value} />
  //     </div>
  //   )
  // }

  const handleDelete = (ind) => {
    const updatedData = userData.filter((_, i) => i !== ind)
    setUserData(updatedData)
    handleCloseDelete()
    setDeleteInd(null)
    localStorage.setItem("data", JSON.stringify(updatedData))
  }

  useEffect(() => {
    // axios('https://jsonplaceholder.typicode.com/users').then(res => {
    //   setUrlData(res.data)
    // }).catch(err => {
    //   console.log("error ", err);
    // })
    dispatch(getUsers())
  }, [dispatch])

  const validateEmail = (email) =>
    validateField(email, /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/, 'email-error');

  const validateAge = (age) => {
    const isValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 90
    document.getElementById('age-error').style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  function calculateTotalTime(now, then) {
    if (then === null) {
      then = "04/09/2013 15:00:00"
    }
    let start = new Date(now.replace(" ", "T"))
    let end = new Date(then.replace(" ", "T"))
    const timeDifferenceMS = end.getTime() - start.getTime();
    let milliseconds = parseInt((timeDifferenceMS % 1000) / 100)
      , seconds = parseInt((timeDifferenceMS / 1000) % 60)
      , minutes = parseInt((timeDifferenceMS / (1000 * 60)) % 60)
      , hours = parseInt((timeDifferenceMS / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  }

  const handleDateClick = async (e) => {
    // alert(e.dateStr);
    const created_date = e.dateStr
    const token = '255|AU2GCstU1ycrHapE29Z9D8lLeI85BzGPC70xru3W'
    const response = await axios(`https://laravel9.etrueconcept.com/btpms/api/activity-log?created_date=&user_id=27`, { headers: { "Authorization": `Bearer ${token}` }, params: { created_date } })
    setApiData(response.data.data)

    // navigate(`btpms/api/activity-log?${created_date}=&user_id=`, { replace: true })


    // e.dayEl.bgColor = 'pink'
    console.log("event ", e);
    e.dayEl.onmouseover = 'pointer'


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
    // console.log("Successfull ", success);
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
      // validateLocalEmail(editData.email) &&
      validateRequiredFields()
    ) {
      // console.log("Successfull2 ", success);

      editData.index = editInd;
      dispatch(updateUser(editData));
      dispatch(setSuccess(true));
      // localStorage.setItem("success", JSON.stringify(true));
      navigate("/");
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

  // function toasterMessage() {

  //   return (
  //     <>
  //       <Toast style={{ background: '#D0F0C0', marginTop: '0px', marginLeft: '700px', position: 'absolute', zIndex: '1' }} onClose={() => setSuccess(false)} delay={5000} autohide>

  //         <Toast.Body>You have Successfully change your data.</Toast.Body>
  //       </Toast>
  //     </>
  //   );

  // }

  const validateField = (field, regex, errorId) => {
    const isValid = regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  const validateUserName = (username) =>
    validateField(username, /^[a-z0-9]+$/i, 'username-error');

  // const comparePassword = (password, confirmPassword) => {
  //   const isValid = password === confirmPassword;
  //   document.getElementById('cPassword-error').style.display = isValid ? 'none' : 'block';
  //   return isValid;
  // };

  // const validatePassword = (password) =>
  //   validateField(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password-error');

  // const handleClear = () => {
  //   setUserName('');
  //   setAge('');
  //   setEmail('');
  //   setPassword('');
  //   setConfirmPassword('');
  //   setSubject(new Map());
  //   setFile(null);
  //   setSelectedValue('');
  //   setGender('');
  //   if (genderInputRef.current) {
  //     genderInputRef.current.value = '';
  //   }
  // if (fileInputRef.current) {
  //   fileInputRef.current.value = '';
  // }
  // };

  return (
    <>
      <div className="main_container">

        <div className="limani_body">
          <Sideer />
          <div className="intersight_content">

            <div className="body_content">
              {/* {success && toasterMessage()} */}
              <Header />
              <div style={{ textAlign: 'center', marginLeft: '200px', marginBottom: '100px', height: '250px', width: '700px' }}>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  initialView="dayGridMonth"
                  dayCellDidMount={(e) => {
                    e.el.style.cursor = 'pointer'
                    if (e.date.getDate() === new Date().getDate() && e.date.getMonth() === new Date().getMonth()) {

                      e.el.style.backgroundColor = 'purple'
                      e.el.style.color = 'white'
                    }
                  }}
                  selectable={true}
                  headerToolbar={{
                    start: "prev prevYear",
                    center: "title",
                    end: 'today nextYear next',

                  }}
                  weekends={true}
                  dateClick={(e) => {
                    handleDateClick(e)
                  }}
                />
              </div>
              {/* {success && (<Alert onClose={() => setSuccess(false)} dismissible variant='success'><Alert.Heading>Successfully updated</Alert.Heading><p>You have Successfully change your data</p></Alert>)} */}
              <div className="contact-profile" style={{ marginTop: '350px' }}>
                <div className="row">
                  {apiData.length > 0 ? (apiData.map((user, ind) => (
                    <div key={ind} id='for-search' className="col-lg-6 mb-3" >
                      <div className="professional_info">
                        <div className="project-card-top">
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <div className="body_heading2 mb-0 ">
                              <div className='d-flex'>
                                <h2 className="font-18 mb-0"><span className="me-2"><img src={user.assignees[0].image_url} style={{ maxWidth: "30px", }} alt="" /></span>{user.assignees.name}</h2>

                              </div>
                              <p className="mb-0 body-sub-heading font-12">Created :- <span>{user.assignees[0].name}</span></p>
                            </div>
                            <p className="mb-0 font-14 body-sub-heading ">Project Name: <span> {user.project.name}</span> </p>
                          </div>
                          <div className='row'>
                            <p className="mb-0 font-14 body-sub-heading col">Start Time: <span> {user.track_times[0].start_time}</span> </p>
                            <p className="mb-0 font-14 body-sub-heading col">working hours: <span> {calculateTotalTime(user.track_times[0].start_time, user.track_times[0].end_time)}</span> </p>
                          </div>
                          <p className="mb-0 font-14 body-sub-heading ">End Time: <span> {user.track_times[0].end_time}</span> </p>

                        </div>

                      </div>
                    </div>
                  )
                  )) : (<p style={{ textAlign: 'center' }}>No data found</p>)}

                </div >
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
                            {/* <p className="my-2 font-14 body-sub-heading ">Updated on: <span>{date}</span>  </p> */}
                          </div>
                          {/* <div className="project-progress mt-2">
                          <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: '25%' }}></div>
                          </div>
                        </div> */}
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
                        {/* <div className="project-bottom">
                      <p className="font-14 mb-0">Next Task:</p>
                      <p className="font-14 mb-0 color-para">Deliverables will be drafted at the time of the design phase</p>
                    </div> */}

                      </div>
                    </div>
                  )
                  )) : (<h1>No data found</h1>)}

                </div >
                {/* <div style={{ marginBottom: '20px', marginLeft: '430px' }}>
                  <Calendar onChange={onChange} value={value} />
                </div> */}


                <div className="row">
                  {data.length > 0 ? (data.map((user, ind) => (
                    <div key={ind} id='for-search' className="col-lg-6 mb-3" >
                      <div className="professional_info">
                        <div className="project-card-top">
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <div className="body_heading2 mb-0 ">
                              <div className='d-flex'>

                                <h2 className="font-18 mb-0"><span className="me-2"><img src='https://avatar.iran.liara.run/public' style={{ maxWidth: "30px", }} alt="" /></span>{user.username}</h2>
                              </div>
                              <p className="mb-0 body-sub-heading font-12">Created by:- <span>{user.email}</span></p>
                            </div>
                            {/* <p className="mb-0 font-14 body-sub-heading ">lng. <span> {user.address.geo.lng}</span> </p> */}
                            <p className="mb-0 font-14 body-sub-heading ">Name: <span> {user.name}</span> </p>

                          </div>
                          <div className="project-card-heading technology-heading d-flex align-items-center justify-content-between">
                            <p className="my-2 font-14 body-sub-heading ">Suite: <span className="me-2">{user.address.suite}
                            </span></p>
                            <p className="my-2 font-14 body-sub-heading ">City: <span> {user.address.city}</span></p>
                            <p className="my-2 font-14 body-sub-heading ">Street: <span>{user.address.street}</span>  </p>
                          </div>

                          {/* <div className="project-progress mt-2">
                          <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{ width: '25%' }}></div>
                          </div>
                        </div> */}
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <p className="my-2 font-14 body-sub-heading ">ZipCode: <span className="me-2"> {user.address.zipcode}</span></p>
                            <p className="my-2 font-14 body-sub-heading ">Lat. <span>{user.address.geo.lat}</span> </p>
                            <p className="my-2 font-14 body-sub-heading ">Lng. <span>{user.address.geo.lng}</span> </p>
                          </div>
                        </div>


                      </div>
                    </div>
                  )
                  )) : isLoading ? <h5 style={{ textAlign: 'center' }}>Loading...</h5> : <h5 style={{ textAlign: 'center' }}>{'some thing wents wrong' || isError}</h5>}

                </div>

                {editInd !== null && (
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form className='row'>
                        <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type='text' name="username" value={editData.username} onChange={handleChange} onInput={validateUserName} placeholder='Enter Username' minLength={6} maxLength={20}
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
                                  checked={(editData.subject).includes(it.label)}
                                  onChange={handleChange}
                                />
                              </label>
                            ))}

                            <span id='subject-error' style={{ display: 'none', color: 'red' }}>Select at least one subject</span>
                          </Form.Group>
                        </div>
                        {/* <div>
                          <Form.Group>
                            <Form.Label className='label-me'>Select Date:</Form.Label>
                            <DatePicker selected={date} onChange={(date) => setDate(date)} />
                          </Form.Group>
                        </div> */}

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
            {/* <Pagination items={userData} pageLimit={pageLimit} setPageItems={setCurrPage} /> */}
          </div>
        </div>

      </div>
    </>

  )
}

export default Project