import React, { useRef, useState } from 'react'
import clock from "../image/clock.png"
import angleDown from "../image/angle-down.png"
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/custom.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const Header = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subject, setSubject] = useState([]);
  // const [addedUser, setaddedUser] = useState({})
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const genderInputRef = useRef()
  // const [success, setSuccess] = useState(false)
 
  const validateField = (field, regex, errorId) => {
    const isValid = regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  const validateUserName = (username) =>
    validateField(username, /^[a-z0-9]+$/i, 'username-error');

  const validateEmail = (email) =>
    validateField(email, /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/, 'email-error');

  const validateAge = (age) => {
    const isValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 90
    document.getElementById('age-error').style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  const validateRequiredFieldsForm = () => {
    let isValid = true;
    if (!gender) {
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    }
    if (!selectedValue) {
      document.getElementById('stream-error').style.display = 'block';
      isValid = false;
    }
    if (subject.size === 0) {
      document.getElementById('subject-error').style.display = 'block';
      isValid = false;
    }
    return isValid;
  };

  const handleRadioChange = (val) => {
    setSelectedValue(val);
    document.getElementById('stream-error').style.display = 'none';
  }

  const handleSubjectChange = (val) => {
    console.log(val.target.name, "     ", val.target.checked);
    const newArr = [...subject];
    if (val.target.checked) {
      newArr.push(val.target.name)
    }
    else {
      newArr.pop(newArr.indexOf(val.target.key))
    }
    setSubject(newArr)
  };

  const handlePasswordChange = (val) => {
    setPassword(val.target.value);
    document.getElementById('password-error').style.display = 'none';
  };

  const handleConfirmPasswordChange = (val) => {
    setConfirmPassword(val.target.value);
    document.getElementById('cPassword-error').style.display = 'none';
  };

  const handleImageClose = (val) => {
    if (fileInputRef.current) {
      document.getElementById('my-icon').style.display = 'none'
      fileInputRef.current.value = null;
      setFile(null)
    }
  }

  const handleProfilePic = (val) => {
    const file = val.target.files[0]
    if (file) {
      document.getElementById('my-icon').style.display = 'block'
      const read = new FileReader()
      read.onloadend = () => {
        setFile(read.result)
      }
      read.readAsDataURL(file)
    }
  };

  const checkOption = [
    { name: 'Physics ', key: 'physics', label: 'Physics ' },
    { name: 'Chemistry ', key: 'chemistry', label: 'Chemistry ' },
    { name: 'Math ', key: 'math', label: 'Math ' },
    { name: 'Biology ', key: 'bio', label: 'Biology ' },
  ];

  const comparePassword = (password, confirmPassword) => {
    const isValid = password === confirmPassword;
    document.getElementById('cPassword-error').style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  const validatePassword = (password) =>
    validateField(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password-error');


  const validateLocalEmail = (email) => {
    const duplicateEmailCheck = document.getElementById('duplicate-error');
    const user = JSON.parse(localStorage.getItem('data')) || [];
    const emailExist = user.some((obj) => obj.email === email);
    duplicateEmailCheck.style.display = emailExist ? 'block' : 'none';
    return emailExist;
  };

  const handleGenderChange = (val) => {
    setGender(val);
    document.getElementById('gender-error').style.display = val === 'select' ? 'block' : 'none';
  };

  const handleForm = () => {
    handleFormOpen()
  }

  const handleFormClose = () => setShowForm(false);

  const handleFormOpen = () => setShowForm(true);


  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleClear = () => {
    setUserName('');
    setAge('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSubject([]);
    setFile(null);
    setSelectedValue('');
    setGender('');
    if (genderInputRef.current) {
      genderInputRef.current.value = '';
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const storeData = (e) => {
    e.preventDefault();
    if (
      validateUserName(userName) &&
      validateEmail(email) &&
      validateAge(age) &&
      validatePassword(password) &&
      comparePassword(password, confirmPassword) &&
      validateRequiredFieldsForm()
    ) {
      const userData = {
        username: userName,
        email,
        gender,
        age,
        stream: selectedValue,
        file,
        subject: [...subject],
        password
      };
      const user = JSON.parse(localStorage.getItem('data')) || [];
      user.push(userData);
      // setaddedUser(userData)
      localStorage.setItem('data', JSON.stringify(user));
      handleClear();
      handleFormClose()
      // setSuccess(true)
    }
  };

  return (
    <>
      <div className="top_header d-flex align-items-center justify-content-between">
        <h1 >Projects</h1>
        <div className="header_notification d-flex align-items-center gap-2">
          <div className="filter-dropdown green-filter dropdown">
            <button className="btn filter-btn green-filter-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span><img src={clock} alt="" className="fltrimg" /> 00 : 12 : 01</span> <img src={angleDown} className="ms-1" alt="" />
            </button>

            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/">Action</Link></li>
              <li><Link className="dropdown-item" to="/">Another action</Link>
              </li>
              <li><Link className="dropdown-item" to="/">Something else
                here</Link></li>
            </ul>
          </div>
          <div className="header_icon position-relative notification d-flex align-items-center justify-content-center">
          

        
            <h6 onClick={handleForm} style={{ cursor: 'pointer' }}>Add</h6>
          </div>
          <div className="header_icon position-relative notification d-flex align-items-center justify-content-center">
            <svg onClick={handleLogout} style={{ cursor: 'pointer' }} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5408 11.9167L9.43242 14.0158C9.3465 14.1011 9.27831 14.2024 9.23177 14.3141C9.18523 14.4259 9.16127 14.5457 9.16127 14.6667C9.16127 14.7877 9.18523 14.9075 9.23177 15.0192C9.27831 15.1309 9.3465 15.2323 9.43242 15.3175C9.51763 15.4034 9.61902 15.4716 9.73072 15.5182C9.84243 15.5647 9.96224 15.5887 10.0833 15.5887C10.2043 15.5887 10.3241 15.5647 10.4358 15.5182C10.5475 15.4716 10.6489 15.4034 10.7341 15.3175L14.4008 11.6508C14.4842 11.5637 14.5496 11.4609 14.5933 11.3483C14.6849 11.1252 14.6849 10.8748 14.5933 10.6517C14.5496 10.5392 14.4842 10.4364 14.4008 10.3492L10.7341 6.68251C10.6486 6.59704 10.5472 6.52924 10.4355 6.48299C10.3238 6.43673 10.2041 6.41293 10.0833 6.41293C9.96238 6.41293 9.84269 6.43673 9.73102 6.48299C9.61935 6.52924 9.51789 6.59704 9.43242 6.68251C9.34695 6.76798 9.27915 6.86944 9.2329 6.98111C9.18664 7.09278 9.16284 7.21247 9.16284 7.33334C9.16284 7.45421 9.18664 7.5739 9.2329 7.68557C9.27915 7.79724 9.34695 7.89871 9.43242 7.98418L11.5408 10.0833H2.74992C2.5068 10.0833 2.27365 10.1799 2.10174 10.3518C1.92983 10.5237 1.83325 10.7569 1.83325 11C1.83325 11.2431 1.92983 11.4763 2.10174 11.6482C2.27365 11.8201 2.5068 11.9167 2.74992 11.9167H11.5408ZM10.9999 1.83334C9.28675 1.82569 7.60573 2.29829 6.14751 3.19752C4.6893 4.09675 3.51227 5.38663 2.74992 6.92084C2.64052 7.13965 2.62252 7.39295 2.69987 7.62502C2.77723 7.8571 2.94362 8.04894 3.16242 8.15834C3.38122 8.26774 3.63452 8.28575 3.8666 8.20839C4.09868 8.13103 4.29052 7.96465 4.39992 7.74584C4.97943 6.57555 5.86093 5.58124 6.95334 4.86567C8.04575 4.15009 9.30942 3.7392 10.6138 3.67547C11.9181 3.61174 13.2158 3.89747 14.3728 4.50314C15.5298 5.10882 16.504 6.01245 17.1949 7.12067C17.8857 8.22889 18.2681 9.50149 18.3025 10.8069C18.3368 12.1124 18.022 13.4034 17.3905 14.5464C16.7589 15.6895 15.8336 16.6432 14.7102 17.3089C13.5867 17.9746 12.3058 18.3283 10.9999 18.3333C9.63306 18.3393 8.29223 17.9597 7.1313 17.2382C5.97038 16.5166 5.03641 15.4824 4.43659 14.2542C4.32718 14.0354 4.13534 13.869 3.90327 13.7916C3.67119 13.7143 3.41789 13.7323 3.19909 13.8417C2.98028 13.9511 2.8139 14.1429 2.73654 14.375C2.65918 14.6071 2.67718 14.8604 2.78659 15.0792C3.51334 16.5417 4.61765 17.7836 5.98527 18.6762C7.35289 19.5689 8.93416 20.08 10.5655 20.1566C12.1969 20.2332 13.8191 19.8726 15.2644 19.1121C16.7097 18.3515 17.9255 17.2187 18.7861 15.8307C19.6468 14.4427 20.121 12.85 20.1597 11.2173C20.1984 9.58456 19.8002 7.97115 19.0063 6.54394C18.2124 5.11673 17.0516 3.92753 15.644 3.09936C14.2364 2.27118 12.6331 1.83411 10.9999 1.83334Z" fill="#83838C" />
            </svg>


          </div>
        </div>
      </div>
      <Modal show={showForm} onHide={handleFormClose}>
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
                  type='text' value={userName} onChange={(e) => setUserName(e.target.value)} minLength={6} maxLength={20}
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

                <Form.Select ref={genderInputRef} onChange={(e) => handleGenderChange(e.target.value)}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
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
                  type='text' value={age} onChange={(e) => setAge(e.target.value)}
                />
                <span id='age-error' style={{ display: 'none', color: 'red' }}>Age must be greater than 16 and less than 90</span>
              </FloatingLabel>
            </Form.Group>


            <div className='row'>
              <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type='text' value={email} onChange={(e) => setEmail(e.target.value)} onInput={(e) => validateLocalEmail(e.target.value)}
                  />
                  <span id='email-error' style={{ display: "none", color: 'red' }}>Enter valid Email</span>
                  <span id='duplicate-error' style={{ display: "none", color: 'red' }}>Email already exist</span>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type='text' value={password} onChange={handlePasswordChange} onInput={validatePassword}
                  />
                  <span id='password-error' style={{ display: "none", color: 'red' }}>Enter valid password</span>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Confirm Password"
                  className="mb-3"
                >
                  <Form.Control
                    type='text' value={confirmPassword} onChange={handleConfirmPasswordChange} onInput={comparePassword}
                  />
                  <span id='cPassword-error' style={{ display: "none", color: 'red' }}>password and confirm password not matched</span>
                </FloatingLabel>
              </Form.Group>
            </div>
            <div className='row'>
              <Form.Group className="mb-3 col" controlId="exampleForm.ControlInput1">

                <Form.Label>Stream: </Form.Label>
                <input type='radio' checked={selectedValue === 'PCM'} onChange={() => handleRadioChange('PCM')} />PCM
                <input type='radio' checked={selectedValue === 'Commerce'} onChange={() => handleRadioChange('Commerce')} />Commerce
                <input type='radio' checked={selectedValue === 'Arts'} onChange={() => handleRadioChange('Arts')} />Arts
                <span id='stream-error' style={{ display: 'none', color: 'red' }}>Select a stream</span>
                <span id='stream-error' style={{ display: 'none', color: 'red' }}>Select a stream</span>
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='label-me'>Subjects: </Form.Label>
                {checkOption.map((it) => (
                  <label key={it.key}>
                    {it.label}
                    <input type='checkbox' name={it.name} checked={subject.includes(it.name)} onChange={handleSubjectChange} />
                  </label>
                ))}

                <span id='subject-error' style={{ display: 'none', color: 'red' }}>Select at least one subject</span>
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile photo</Form.Label>
              <Form.Control
                type='file' ref={fileInputRef} multiple onChange={handleProfilePic}
              />

              <div style={{ position: 'relative' }}>
                <span onClick={handleImageClose} id='my-icon' className="close AClass" style={{ position: 'absolute', cursor: 'pointer', fontSize: '25px', display: 'none' }} >&times;</span>
                <img alt='' src={file} style={{ maxWidth: "154px" }} />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormClose}>
            Close
          </Button>
          <Button variant="primary" onClick={storeData}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Header

