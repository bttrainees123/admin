
export const validateUserName = (username) =>
    validateField(username, /^[a-z0-9]+$/i, 'username-error');


export const validateEmail = (email) =>
    validateField(email, /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/, 'email-error');


export const validateAge = (age) => {
    const isValid = parseInt(age, 10) >= 16 && parseInt(age, 10) <= 90
    document.getElementById('age-error').style.display = isValid ? 'none' : 'block';
    return isValid;
};

export const validatePassword = (password) =>
    validateField(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password-error');

const validateField = (field, regex, errorId) => {
    const isValid = regex.test(field);
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
    return isValid;
};

export const genderOptions = ["Male", "Female", "Other"]
  
export const checkOption = [
  { name: 'Physics ', key: 'physics', label: 'Physics ' },
  { name: 'Chemistry ', key: 'chemistry', label: 'Chemistry ' },
  { name: 'Math ', key: 'math', label: 'Math ' },
  { name: 'Biology ', key: 'bio', label: 'Biology ' },
];


  
export const validateLocalEmail = (email) => {
    const duplicateEmailCheck = document.getElementById('duplicate-error');
    const user = JSON.parse(localStorage.getItem('data')) || [];
    const emailExist = user.some((obj) => obj.email === email);
    duplicateEmailCheck.style.display = emailExist ? 'block' : 'none';
    return emailExist;
  };

  