import axios from '../utils/middlewares'
import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import DragNDrop from './DragNDrop';


const HomePage = () => {
  const [image, setImage] = useState()
  const [file, setFile] = useState([])
  const [progressBar, setProgressBar] = useState(0)
  const [formValues, setFormValues] = useState([{ name: "", email: "", password: "", age: "", image: null }])

  const handleFile = (ind, val) => {
    handleChange(ind, val)
    // console.log("ppppppp", formValues[ind][val]);
    const file = val.target.files[0]
    const formData = new FormData()
    setImage(URL.createObjectURL(file))
    formData.append('file', file)
    axios.post('http://localhost:3000/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: val => {
        console.log("val.loaded", val.loaded, "val.total", val.total);
        
        setProgressBar(Math.floor(100 * val.loaded) / val.total)
      }
    }).then(res => setImage(URL.createObjectURL(file))).catch(err => console.log("error: ", err)
    )
  }

  const validateUserName = (username) =>
    validateField(username, /^[a-z0-9]+$/i, 'username-error');


  const validateEmail = (email) =>
    validateField(email, /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/, 'email-error');


  const validateAge = (age) => {
    const isValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 90
    document.getElementById('age-error').style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  const validatePassword = (password) =>
    validateField(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password-error');

  const validateField = (field, regex, errorId) => {
    const isValid = field === "" || regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "", password: "", age: "", image: null }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('form')) || [];
    user.push(...formValues);
    localStorage.setItem('form', JSON.stringify(user));
    console.log(...formValues);
    alert(JSON.stringify(formValues));
  }

  return (
    <>
      <h3 style={{ marginLeft: '600px', paddingTop: '100px' }}>Add to Append</h3>
      <form style={{ margin: '70px' }} onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <div className="form-group">
              <label>UserName: </label><br />
              <input type="text" className="form-control" name="name" value={element.name || ""} onInput={(e) => validateUserName(e.target.value)} onChange={e => handleChange(index, e)} placeholder="Enter username" />
              <span id='username-error' style={{ display: "none", color: 'red' }}>Enter valid username</span><br />
            </div>
            <div className="form-group">
              <label>Email: </label><br />
              <input type="text" className="form-control" name="email" value={element.email || ""} onInput={(e) => validateEmail(e.target.value)} onChange={e => handleChange(index, e)} placeholder="Enter email" />
              <span id='email-error' style={{ display: "none", color: 'red' }}>Enter valid Email</span><br />
              <span id='duplicate-error' style={{ display: "none", color: 'red' }}>Email already exist</span><br />
            </div>
            <div className="form-group">
              <label>Password: </label><br />
              <input type="text" className="form-control" name="password" value={element.password || ""} onInput={(e) => validatePassword(e.target.value)} onChange={e => handleChange(index, e)} placeholder="Enter password" />
              <span id='password-error' style={{ display: "none", color: 'red' }}>Enter valid password</span><br />
            </div>
            <div className="form-group">
              <label>Age: </label><br />
              <input type="text" className="form-control" name="age" value={element.age || ""} onInput={(e) => validateAge(e.target.value)} onChange={e => handleChange(index, e)} placeholder="Enter age" />
              <span id='age-error' style={{ display: 'none', color: 'red' }}>Age must be greater than 16 and less than 90</span><br />
            </div>
            {/* <div className="form-group">
              <label>Image: </label><br />
              <input type="file" className="form-control" name="image" value={element.image || ""} onChange={(e) => handleFile(index, e)} />
              <br /> <br /> */}
              {/* <div className='progressbar'> 
                  <div className='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-label='progressbar' aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: `${progressBar}%`}}>
                  </div>
              </div> */}
              {/* <div>
                {progressBar === 100 ? (<ProgressBar variant='success' animated now={progressBar} label={`${progressBar}%`} style={{ width: `${progressBar}%` }} />):( <ProgressBar animated now={progressBar} label={`${progressBar}%`} style={{ width: `${progressBar}%` }} />)}
                </div>
              <br />
              {

                image &&
                <img src={image} alt='' className='w-25 h-25' />
              }

            </div> */}
            {/* {progressBar === 1000 ? (<img src={image} alt='' className='w-25 h-25' />) : (<ProgressBar animated now={progressBar} onChange={(e) => handleProgress(e.target.value)} label={`${progressBar}%`} style={{ width: `${progressBar}%` }} />)} */}


            {
              index ?
                <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                : null
            }
            <div>
              <DragNDrop onFilesSelected={setFile} width="300px" height="400px" />
            </div>
          </div>
          
        ))}
        <div className="button-section">
          <button className="btn btn-success" style={{ margin: '5px' }} type="button" onClick={() => addFormFields()}>Add</button>
          <button className="btn btn-primary" style={{ margin: '5px' }} type="submit">Submit</button>
        </div>
      </form>
    </>



  )
}

export default HomePage