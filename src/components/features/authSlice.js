import { createSelector, createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: '',
    email: '',
    file: null,
    age: "",
    password: "",
    gender: "",
    subject: [],
    stream: "",
    role: '',
    access: [],
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuthenticated: (state, action) => {
            console.log(action.payload)
            state.auth = action.payload
            state.isAuth = true
            localStorage.setItem('isLoggedIn', state.isAuth);
            localStorage.setItem('user', JSON.stringify(state.auth));
        },
        getAuthUser: (state, action) => {
            const user = localStorage.getItem('user')
            state.auth = user
        }
    }
})
const authUsername = (state) => state.auth.username
export const selectCurrentUserUsername = createSelector(
    authUsername,
    (username) => username
);
export const authEmail = (state) => state.auth.email
export const authFile = (state) => state.auth.file

export const { isAuthenticated } = authSlice.actions
export default authSlice.reducer

