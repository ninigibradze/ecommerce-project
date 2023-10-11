import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
    user: null,
}

export const amazonSlice = createSlice({
    name: 'amazon',
    initialState,
    reducers: {
        addToCart:(state, action) => {
            const item = state.products.find((product)=> product.id === action.payload.id);
            if(item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }  
            localStorage.setItem("cartProducts", JSON.stringify(state.products));          
        },
        incrementQuantity:(state, action) => {
            const item = state.products.find((item) => item.id === action.payload);
            item.quantity++;
            localStorage.setItem("cartProducts", JSON.stringify(state.products));
        },
        decrementQuantity:(state, action) => {
            const item = state.products.find((item) => item.id === action.payload);
            if(item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
            }     
            localStorage.setItem("cartProducts", JSON.stringify(state.products));       
        },
        deleteItem:(state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)
            localStorage.setItem("cartProducts", JSON.stringify(state.products));
        },
        resetCart:(state) => {
            state.products = [];
            localStorage.removeItem("cartProducts");
        },
        loadCart: (state, action) => {
            state.products = action.payload;
        },
    }
})

export const { addToCart, deleteItem, resetCart, incrementQuantity, decrementQuantity } = amazonSlice.actions;
export default amazonSlice.reducer;