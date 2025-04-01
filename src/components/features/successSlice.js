import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMe: JSON.parse(localStorage.getItem("success")) || false,
};

const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.successMe = action.payload;
      localStorage.setItem("success", JSON.stringify(action.payload)); 
    },
  },
});

export const { setSuccess } = successSlice.actions;
export default successSlice.reducer;

