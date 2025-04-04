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
import Toast from 'react-bootstrap/Toast';


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
  const success = useSelector((state) => state.success.successMe);
  // type ValuePiece = Date | null;

  // const Value = ValuePiece | [ValuePiece, ValuePiece];

  // const [value, onChange] = useState(new Date());
  // const pageLimit = 2;

  //   if (data?.text) {
  //     const text = chain(data?.text).replace(/(\r\n|\n|\r)/gm, " ").replace(/,/g, "").replace(/\./g, "").trim().lowerCase().value();
  //     const str = chain(text)
  //     console.log("Str ", str);
  //     const words = chain(text).split(" ").map((item) => {
  //         if (item) {
  //             return item
  //         }
  //     }).value();
  //     console.log("Words >> ", words);
  //     if (difference(VALID_WORDS, words)?.length === 0) {
  //         setMessage("Image has valid words.")
  //     } else {
  //         setMessage("Could not find required text in the image.");
  //     }
  // } else {
  //     setMessage("Could not find any text in image.");
  // }

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
  useEffect(() => {
    const storedSuccess = localStorage.getItem('success');
    if (storedSuccess === 'true') {
      dispatch(setSuccess(true));
      localStorage.removeItem('success'); 
    }

    if (success) {
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 3000); 
    }
    
  }, [success, dispatch]);
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
    return hours + "h:" + minutes + "m:" + seconds + "s";
  }

  const handleDateClick = async (e) => {
    const created_date = e.dateStr
    const token = '255|AU2GCstU1ycrHapE29Z9D8lLeI85BzGPC70xru3W'
    const response = await axios(`https://laravel9.etrueconcept.com/btpms/api/activity-log?created_date=${created_date}&user_id=27`, { headers: { "Authorization": `Bearer ${token}` }})
    setApiData(response.data.data)
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

  const validateField = (field, regex, errorId) => {
    const isValid = regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  function toasterMessage() {
    
    return (
      // <>
      //   <Toast style={{ background: '#D0F0C0', marginLeft: '1000px', position: 'absolute', zIndex: '1' }} onClose={() => dispatch(setSuccess(false))} delay={3000} autohide>
      //     <Toast.Body>You have Successfully LoggedIn.</Toast.Body>
      //   </Toast>
      // </>
      <>
        <Toast style={{ background: '#D0F0C0', marginBottom: '5px', marginLeft: '600px', position: 'absolute' }} onClose={() => dispatch(setSuccess(false))} delay={3000} autohide>
          
          <Toast.Body>Password Changed Successfully</Toast.Body>
        </Toast>
      </>
    );
  }

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
      <div className="main_container" style={{position: 'relative' }}>
      <div style={{marginTop: '0px' }}>-{success && toasterMessage()}</div>
        <div className="limani_body">
          <Sideer />
          <div className="intersight_content">

            <div className="body_content" >
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
                
                {/* <div style={{ marginBottom: '20px', marginLeft: '430px' }}>
                  <Calendar onChange={onChange} value={value} />
                </div> */}




             


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