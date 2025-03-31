import axios from '../utils/middlewares'
import React, { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

const HomePage = () => {
  const [formValues, setFormValues] = useState([{ name: '', email: '', password: '', age: '', images: [] }])
  const [progressBars, setProgressBars] = useState([])

  const handleFile = (index, event) => {
    const files = Array.from(event.target.files)
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
      formData.append('file', file)

      axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (val) => {
          const percent = Math.floor((100 * val.loaded) / val.total)
          setProgressBars((prev) => {
            const newProgress = [...prev]
            newProgress[i] = percent
            return newProgress
          })
        },
      }).catch((err) => console.log('Upload Error:', err))
    })
  }

  const handleChange = (i, e) => {
    let newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  const addFormFields = () => {
    setFormValues([...formValues, { name: '', email: '', password: '', age: '', images: [] }])
  }

  const removeFormFields = (i) => {
    let newFormValues = [...formValues]
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem('form')) || []
    user.push(...formValues)
    localStorage.setItem('form', JSON.stringify(user))
    alert('Form Submitted')
  }

  return (
    <>
      <h3 style={{ marginLeft: '600px', paddingTop: '100px' }}>Add to Append</h3>
      <form style={{ margin: '70px' }} onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(index, e)}>
            <div className="form-group">
              <label>UserName: </label><br />
              <input type="text" className="form-control" name="name" value={element.name || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter username" />
              <br />
            </div>
            <div className="form-group">
              <label>Email: </label><br />
              <input type="text" className="form-control" name="email" value={element.email || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter email" />
              <br />
            </div>
            <div className="form-group">
              <label>Password: </label><br />
              <input type="text" className="form-control" name="password" value={element.password || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter password" />
              <br />
            </div>
            <div className="form-group">
              <label>Age: </label><br />
              <input type="text" className="form-control" name="age" value={element.age || ''} onChange={(e) => handleChange(index, e)} placeholder="Enter age" />
              <br />
            </div>
            <div className="form-group">
              <label>Upload and Drop Images: </label><br />
              <input type="file" className="form-control" multiple onChange={(e) => handleFile(index, e)} />
              <br />
              {progressBars.map((progress, i) => (
                <ProgressBar key={i}  variant={progress === 100 ? 'success' : 'info'} animated now={progress} label={`${progress}%`} style={{ width: '200px', margin: '5px' }} />
              ))}
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {element.images.map((img, i) => (
                  <img key={i} src={URL.createObjectURL(img)} alt="preview" style={{ width: '80px', height: '80px', margin: '5px' }} />
                ))}
              </div>
            </div>

            {index ? (
              <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
            ) : null}

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