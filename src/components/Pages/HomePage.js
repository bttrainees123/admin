import React, { useState } from 'react'

const HomePage = () => {
  const [formValues, setFormValues] = useState([{ name: "", email: "", password: "", age: "" }])

  
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
    setFormValues([...formValues, { name: "", email: "", password: "", age: "" }])
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
            {
              index ?
                <button type="button" className="btn btn-danger" onClick={() => removeFormFields(index)}>Remove</button>
                : null
            }
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