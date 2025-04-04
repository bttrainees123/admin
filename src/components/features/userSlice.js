import { createSlice } from "@reduxjs/toolkit";
import { isAuthenticated } from "./authSlice";

const initialState = {
  username: "",
  email: "",
  file: null,
  age: "",
  password: "",
  gender: "",
  subject: [],
  stream: "",
  success: false,
  date: Date.now()
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.subject = action.payload.subject;
      state.stream = action.payload.stream;
      const users = JSON.parse(localStorage.getItem("data")) || [];
      users.push(action.payload);
      localStorage.setItem("data", JSON.stringify(users));
    },
    updateUser: (state, action) => {
      console.log("action.payload", action.payload);
      
      state.username = action.payload.username;
      state.file = action.payload.file
      state.success = action.payload.success
      state.date = action.payload.date
      const users = JSON.parse(localStorage.getItem("data")) || [];
      users[action.payload.index] = action.payload;
      localStorage.setItem("data", JSON.stringify(users));
    },
    updateLoggedInUser: (state, action) => {
      const users = JSON.parse(localStorage.getItem("data")) || [];
      const filteredUser = users.find((u) => u.email === action.payload.email);
      const user = users.filter((obj) =>
        obj.email === action.payload.email)
      console.log("filteredUser", filteredUser);
      console.log("action.payload", action.payload);
      filteredUser.username = action.payload.username
      filteredUser.email = action.payload.email;
      filteredUser.password = action.payload.password;
      filteredUser.age = action.payload.age;
      filteredUser.gender = action.payload.gender;
      filteredUser.subject = action.payload.subject;
      user.push(filteredUser)
      localStorage.setItem('data', JSON.stringify(users));
      dispatch(isAuthenticated(editData))
    },
    updateImageInUser: (state, action) => {
      const users = JSON.parse(localStorage.getItem("data")) || [];
      const filteredUser = users.find((u) => u.email === action.payload.email);
      const user = users.filter((obj) =>
        obj.email === action.payload.email)
      console.log("filteredUser", filteredUser);
      console.log("action.payload", action.payload);
      filteredUser.username = action.payload.username
      filteredUser.email = action.payload.email;
      filteredUser.password = action.payload.password;
      filteredUser.age = action.payload.age;
      filteredUser.gender = action.payload.gender;
      filteredUser.subject = action.payload.subject;
      // filteredUser.file = action.payload.file
      user.push(filteredUser)
      localStorage.setItem('data', JSON.stringify(users));
    }
  },
});

export const { saveUser, updateUser, updateImageInUser, updateLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
