
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
