import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoad: false,
    cartItem: JSON.parse(localStorage.getItem("list")) || [], 
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
            localStorage.setItem("list", JSON.stringify(state.cartItem)); 
            state.localStorageItems = [...state.cartItem]; 
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
                localStorage.setItem("list", JSON.stringify(state.cartItem));
                state.localStorageItems = [...state.cartItem]; 
            } else {
                console.warn('Cannot remove item from cart. Item not found.');
            }
        },
    },
});

export const {addTCart, getCartItem, removeTCart} = cartSlice.actions
export default cartSlice.reducer



// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     isLoad: false,
//     cartItem: JSON.parse(localStorage.getItem("list")) || [], // Initialize from localStorage
//     error: false,
//     localStorageItems: JSON.parse(localStorage.getItem("list")) || [],
// }

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addTCart: (state, action) => {
//             console.log("Action ", action.payload);
//             state.cartItem.push(action.payload);
//             localStorage.setItem("list", JSON.stringify(state.cartItem)); // Update localStorage
//             state.localStorageItems = [...state.cartItem]; // Sync localStorageItems
//             console.log("state ", state.cartItem.length);
//         },
//         getCartItem: (state) => {
//             const storedItems = JSON.parse(localStorage.getItem("list")) || [];
//             state.cartItem = storedItems;
//             state.localStorageItems = storedItems;
//         },
//         removeTCart: (state, action) => {
//             const ind = state.cartItem.findIndex((item) => item.id === action.payload.id);
//             if (ind >= 0) {
//                 state.cartItem.splice(ind, 1);
//                 localStorage.setItem("list", JSON.stringify(state.cartItem)); // Update localStorage
//                 state.localStorageItems = [...state.cartItem]; // Sync localStorageItems
//             } else {
//                 console.warn('Cannot remove item from cart. Item not found.');
//             }
//         },
//     },
// });

// export const { addTCart, getCartItem, removeTCart } = cartSlice.actions;
// export default cartSlice.reducer;
