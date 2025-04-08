import axios from '../utils/middlewares'
import React, { useEffect, useRef, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast';
import { setSuccess } from '../features/successSlice';
// import { ToastContainer, toast } from 'react-toastify';
import ReactHtmlParser from 'react-html-parser'

const HomePage = () => {
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState([{ name: '', email: '', password: '', age: '', images: [] }])
  const [progressBars, setProgressBars] = useState(0)
  const fileInputRef = useRef(null);
  const success = useSelector((state) => state.success.successMe);
  const htmlString = '<div><h1>Welcome to React</h1><p>This is parsed HTML.</p></div>';

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

  const handleFile = (index, event) => {
    console.log("event.target.files", event.target.files);
    const files = Array.from(event.target.files)
    console.log("Files ", files)
    const newFormValues = [...formValues]
    newFormValues[index].images.push(...files)
    setFormValues(newFormValues)
    uploadFiles(files)
  }
  const handleDrop = (index, event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    const newFormValues = [...formValues]
    newFormValues[index].images.push(...files)
    setFormValues(newFormValues)
    uploadFiles(files)

  }

  const uploadFiles = (files) => {
    files.forEach((file, i) => {
      const formData = new FormData()
      console.log('file', file)
      formData.append('file', file)
      axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (val) => {
          // const percent = Math.round((100 * val.loaded) / val.total)
          // setProgressBars(percent)
          progress(0)
        },
      }).catch((err) => console.log('Upload Error:', err))
    })
  }

  const progress = function (sec) {
    let interval = 250;
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


  const handleChange = (i, e) => {
    let newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  // const addFormFields = () => {
  //   setFormValues([...formValues, { name: '', email: '', password: '', age: '', images: [] }])
  // }

  const removeFormFields = (i) => {
    let newFormValues = [...formValues]
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
  }
  const handleImageClose = (e, i, index) => {
    const newFormValues = [...formValues]
    newFormValues[index].images.splice(i, 1)
    console.log("newFormValues[index] ", newFormValues[index]);
    setFormValues(newFormValues)
    if (formValues[index].images.length === 0) {
      setProgressBars(0)
      fileInputRef.current.value = null
    }
    console.log("newFormValues.....", formValues[index].images.length);
  }
  const handleClearForm = () => {
    setFormValues([{ name: '', email: '', password: '', age: '', images: [] }])
    setProgressBars(0)
    fileInputRef.current.value = null
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem('form')) || []
    user.push(...formValues)
    localStorage.setItem('form', JSON.stringify(user))
    // handleClearForm()
    return ReactHtmlParser('<h1>Hello world!</h1>')

  }

  function toasterMessage() {

    return (
      <>
        <Toast style={{ background: '#D0F0C0', marginLeft: '1000px', position: 'absolute', zIndex: '1' }} onClose={() => dispatch(setSuccess(false))} delay={3000} autohide>
          <Toast.Body>You have Successfully change your data.</Toast.Body>
        </Toast>
      </>
    );
  }
  return (
    <div style={{ marginTop: '0px' }}>
      <div style={{ marginTop: '0px' }}>-{success && toasterMessage()}</div>

      <form style={{ margin: '70px' }} onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(index, e)}>
            <div className='row'>
              <div className="form-group col">
                <label>UserName: </label><br />
                <input type="text" className="form-control" name="name" value={element.name || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter username" />
                <br />
              </div>
              <div className="form-group col">
                <label>Email: </label><br />
                <input type="text" className="form-control" name="email" value={element.email || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter email" />
                <br />
              </div>
            </div>
            <div className='row'>
              <div className="form-group col">
                <label>Password: </label><br />
                <input type="text" className="form-control" name="password" value={element.password || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter password" />
                <br />
              </div>
              <div className="form-group col">
                <label>Age: </label><br />
                <input type="text" className="form-control" name="age" value={element.age || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter age" />
                <br />
              </div>
            </div>
            <div className="form-group" style={{ marginLeft: '400px', marginRight: '400px', borderRadius: '5px', border: '1px solid rgb(180, 180, 180)' }}>
              <label style={{ marginLeft: '130px' }}>Upload and Drop Images </label><br />
              <input type="file" ref={fileInputRef} accept="image/*" className="form-control" id="fileInput" multiple onChange={(e) => handleFile(index, e)} onClick={(e) => {
                e.currentTarget.value = null
              }} />
              <br />
              <ProgressBar variant={progressBars === 100 ? 'success' : 'info'} id='progress-bar' animated now={progressBars} label={`${progressBars}%`} style={{ width: '97%', margin: '5px', display: progressBars === 0 ? 'none' : 'block' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {element.images.map((img, i) => (
                  <div>
                    {/* <span onClick={(e) => handleImageClose(e, i)} id='my-icon' className="close AClass" style={{ position: 'absolute', cursor: 'pointer', fontSize: '25px' }} ></span> */}
                    <img key={i} src={URL.createObjectURL(img)} alt="preview" style={{ width: '80px', height: '80px', margin: '5px' }} /><span onClick={(e) => handleImageClose(e, i, index)} id='my-icon' className="close AClass" style={{ cursor: 'pointer', fontSize: '25px', marginBottom: '25px' }}>&times;</span>
                    <p style={{ width: '80px', height: '80px', marginLeft: '5px' }}>{img.name.slice(0, 10)}</p>
                  </div>
                ))}
              </div>
            </div>
            {index ? (
              <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          {/* <button className="btn btn-success" style={{ margin: '5px' }} type="button" onClick={() => addFormFields()}>Add</button> */}
          <button className="btn btn-primary" style={{ marginLeft: '560px', marginTop: '12px' }} type="submit">Submit</button>
        </div>
        <>
          <section className="drag-drop" >
            <div
              className={`document-uploader ${true ? "upload-box active" : "upload-box"
                }`}
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
            </div>
          </section>
        </>
      </form>
    </div>
  )
}

export default HomePage