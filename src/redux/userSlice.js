import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems } from "../services/cart/getCartItems";
import { removeCartItemBase } from "../services/cart/removeCartItem";

const initialState = {
	isLoggedIn: false,
	isLoaded: false,
	email: "",
	exp: 0,
	iat: 0,
	nameid: "",
	nbf: 0,
	role: undefined,
	unique_name: "",
	cartItems: {		
		isLoading: true,
		isLoaded: false,
		isError: false,
		data: {},
	},
};

export const getReduxCartItems = createAsyncThunk(
	"cart/items", 
	getCartItems);

export const removeCartItem = createAsyncThunk(
	"cart/remove",
	removeCartItemBase
);

const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		handleLogin: (state, { payload }) => {
			state.isLoggedIn = true; 
			for (let key in payload) {
				state[key] = payload[key];
			}
		},
		handleAddProduct(state, action) {
			state.cartItems.data[action.payload.id] = action.payload;
		},
		handleLogout: (state) => {
			localStorage.removeItem("token");
			window.location.href = "/ecommerce-project";
		},
		handleRemoveOptimisticProduct(state, action) {
			delete state.cartItems.data[action.payload];
		},
		handleInputChange(state, { payload }) {
			state[payload.name] = payload.value;
		},
	},

	extraReducers(builder) {
		builder.addCase(getReduxCartItems.fulfilled, (state, action) => {
			state.cartItems.isLoaded = true;
			state.cartItems.isLoading = false;
			state.cartItems.isError = false;
			const newObj = {};
			action.payload.forEach((product) => {
				newObj[product.id] = product;
			});
			state.cartItems.data = newObj;
		});
		builder.addCase(removeCartItem.fulfilled, (state, { payload }) => {
			if (payload) {
				delete state.cartItems.data[payload];
			}
		});
	},
});

export const {
	handleLogin,
	handleLogout,
	handleAddProduct,
	handleRemoveOptimisticProduct,
	handleInputChange,
} = usersSlice.actions;
export default usersSlice.reducer;