import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMe: JSON.parse(localStorage.getItem("success")) || false,
  successPass: JSON.parse(localStorage.getItem("passChange")) || false,
};

const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.successMe = action.payload;
      localStorage.setItem("success", JSON.stringify(action.payload));
    },
    setPassChange: (state, action) => {
      state.successPass = action.payload;
      localStorage.setItem("passChange", JSON.stringify(action.payload));
    },
  },
});

export const { setSuccess, setPassChange } = successSlice.actions;
export default successSlice.reducer;

