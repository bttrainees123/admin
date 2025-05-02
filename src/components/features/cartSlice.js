import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoad: false,
  cartItem: JSON.parse(localStorage.getItem("list")) || [],
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTCart: (state, action) => {
      const isExist = state.cartItem.some(item => item.id === action.payload.id);
      if (!isExist) {
        state.cartItem.push(action.payload);
        localStorage.setItem("list", JSON.stringify(state.cartItem));
      }
    },
    removeTCart: (state, action) => {
      state.cartItem = state.cartItem.filter(item => item.id !== action.payload.id);
      localStorage.setItem("list", JSON.stringify(state.cartItem));
    },
    getCartItem: (state) => {
      const storedItems = JSON.parse(localStorage.getItem("list")) || [];
      state.cartItem = storedItems;
    },
  },
});

export const { addTCart, removeTCart, getCartItem } = cartSlice.actions;
export default cartSlice.reducer;

