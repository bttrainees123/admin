
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./components/features/counterSlice";
import userSlice from "./components/features/userSlice";
import authSlice from "./components/features/authSlice";
import apiSlice from "./components/features/apiSlice";
import productSlice from "./components/features/productSlice";
import commentSlice from "./components/features/commentSlice";
import companySlice from "./components/features/companySlice";
import cartSlice from "./components/features/cartSlice";
import postSlice from "./components/features/postSlice";
import successSlice from "./components/features/successSlice";

const store = configureStore({
    reducer: {
        counter: counterSlice,
        users: userSlice,
        auth: authSlice,
        api: apiSlice,
        products: productSlice,
        comments: commentSlice,
        company: companySlice,
        cart: cartSlice,
        success: successSlice,
        post: postSlice
    }
})

export default store


