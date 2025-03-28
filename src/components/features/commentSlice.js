import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchCommentData } from "./userAPI"

export const getComments = createAsyncThunk('api/fetchComments', async () => {
    const res = await fetchCommentData()
    console.log("Res ", res.data.comments);
    return res.data.comments;
})
const initialState = {
    isLoading: false,
    data: [],
    isError: false
}

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            console.log("fulfilled ",action.payload);
        })
        builder.addCase(getComments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.error.message;
            console.log("rejected ",action.payload); 
        })
    }
})

export const { addComment } = commentSlice.actions
export default commentSlice.reducer