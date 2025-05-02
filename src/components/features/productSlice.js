import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsData } from "./userAPI";

export const getProducts = createAsyncThunk('api/fetchProducts', async () => {
    const data = await fetchProductsData()
    return data;
})

const initialState = {
    isLoading: false,
    data: [],
    isError: false
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            console.log("fulfilled ", action.payload.data);
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.error.message
        })
    }
})

export const { addCart } = productSlice.actions

export default productSlice.reducer