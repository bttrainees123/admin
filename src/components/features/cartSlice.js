import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoad: false,
    cartItem: [],
    error: false,
    localStorageItems: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addTCart: (state, action) => {
            console.log("Action ", action.payload);
            state.cartItem.push(action.payload)
            console.log("state ", state.cartItem.length)
            localStorage.setItem("list", JSON.stringify(state.cartItem));
            console.log("state ", state.localStorageItems)
        },
        getCartItem: (state, action) => {
            state.localStorageItems = JSON.parse(localStorage.getItem("list"));
        },
        removeTCart: (state, action) => {
            const ind = state.cartItem.findIndex((item) => item.id === action.payload.id)
            let newCart = [...state.cartItem]
            if(ind >= 0){
                newCart.splice(ind, 1);
            }
            else{
                console.warn('Cant remove item from cart')
            }
            state.cartItem = newCart
        }
    },
    
})

export const {addTCart, getCartItem, removeTCart} = cartSlice.actions
export default cartSlice.reducer



import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoad: false,
    cartItem: JSON.parse(localStorage.getItem("list")) || [], // Initialize from localStorage
    error: false,
    localStorageItems: JSON.parse(localStorage.getItem("list")) || [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addTCart: (state, action) => {
            console.log("Action ", action.payload);
            state.cartItem.push(action.payload);
            localStorage.setItem("list", JSON.stringify(state.cartItem)); // Update localStorage
            state.localStorageItems = [...state.cartItem]; // Sync localStorageItems
            console.log("state ", state.cartItem.length);
        },
        getCartItem: (state) => {
            const storedItems = JSON.parse(localStorage.getItem("list")) || [];
            state.cartItem = storedItems;
            state.localStorageItems = storedItems;
        },
        removeTCart: (state, action) => {
            const ind = state.cartItem.findIndex((item) => item.id === action.payload.id);
            if (ind >= 0) {
                state.cartItem.splice(ind, 1);
                localStorage.setItem("list", JSON.stringify(state.cartItem)); // Update localStorage
                state.localStorageItems = [...state.cartItem]; // Sync localStorageItems
            } else {
                console.warn('Cannot remove item from cart. Item not found.');
            }
        },
    },
});

export const { addTCart, getCartItem, removeTCart } = cartSlice.actions;
export default cartSlice.reducer;
