import { createSlice } from "@reduxjs/toolkit";

const ItemDetailInfoReducer = createSlice({
    name:"ItemDetailInfo",
    initialState:{
        Item:{},
    },
    reducers:{
        setItem:(state, action)=>{
            state.Item = action.payload;
        }
    }
})

export const {setItem} = ItemDetailInfoReducer.actions;

export default ItemDetailInfoReducer.reducer;