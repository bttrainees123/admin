import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchUserData } from "./userAPI";

export const getUsers = createAsyncThunk('api/fetchUsers', async () => {
    const data = await fetchUserData();
    console.log("DATATAT ", data);
    return data;
})

const initialState = {
    isLoading: false,
    data: [],
    isError: false
}

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true
            console.log("pending ", action.payload);
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
            console.log("fulfilled ", action.payload.data);
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.error.message;
            console.log("rejected ", action.payload);
        })
    }

})

export const { addUser } = apiSlice.actions;

export default apiSlice.reducer


