import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCompanyData } from "./userAPI";

export const getCompany = createAsyncThunk('company/fetchCompanies', async () => {
    const res = await fetchCompanyData()
    console.log("Res Company ", res.data);
    return res.data;
})

const initialState = {
    loading: false,
    res: [],
    error: false
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        addCompany: (state, action) => {
            state.res.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCompany.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.res = action.payload
            console.log("fulfilled ", action.payload);
        })
        builder.addCase(getCompany.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            console.log("rejected ", action.payload);
        })
    }
})

export const { addCompany } = companySlice.actions;

export default companySlice.reducer