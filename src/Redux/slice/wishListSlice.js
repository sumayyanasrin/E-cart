import { createSlice } from "@reduxjs/toolkit";


const wishListSlice= createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[]
    },
    reducers:{
        addToWishList:(state,action)=>{
            state.wishlist.push(action.payload)
        },
        removeFromWishlist:(state,action)=>{
            state.wishlist=state.wishlist.filter(item=>item.id!=action.payload)
        }
    }
})

export const {addToWishList,removeFromWishlist}=wishListSlice.actions
export default wishListSlice.reducer
