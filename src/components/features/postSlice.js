import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPostData } from "./userAPI";


export const getPost = createAsyncThunk('post/fetchPosts', async () => {
    const res = await fetchPostData();
    console.log("Res Post ", res.data);
    return res.data
})

const initialState = {
    loading: false,
    res: [],
    error: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPost.pending, (state, action) => {
            state.loading = true;
            console.log("pending ", action.payload);
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.res = action.payload
            console.log("fulfilled ", action.payload);
        })
        builder.addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            console.log("rejected ", action.payload);
        })
    }
})

export default postSlice.reducer