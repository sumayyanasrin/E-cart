import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import wishListSlice from "./slice/wishListSlice"; 
import cartSlice from "./slice/cartSlice"

const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishListReducer:wishListSlice,
        cartReducer:cartSlice

    }
})

export default cartStore