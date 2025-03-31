import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  age: "",
  password: "",
  gender: "",
  subject: [],
  stream: "",
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
      state.username = action.payload.username;
      const users = JSON.parse(localStorage.getItem("data")) || [];
      users[action.payload.index] = action.payload;
      localStorage.setItem("data", JSON.stringify(users));
    },
  },
});

export const { saveUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
