import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    image: null,
}

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers:{
        saveInvoice: (state, action) => {
            state.image = action.payload.image;
            const invoiceData = JSON.parse(localStorage.getItem("invoice")) || [];
            invoiceData.push(action.payload)
            console.log("action.payload.image", action.payload)
            localStorage.setItem('invoice', JSON.stringify(invoiceData))
        },
        getInvoice: (state) => {
            const storedInvoice = JSON.parse(localStorage.getItem("invoice")) || []
            state.image = storedInvoice;
        }
    }
})

export const { saveInvoice, getInvoice } = invoiceSlice.actions
export default invoiceSlice.reducer;