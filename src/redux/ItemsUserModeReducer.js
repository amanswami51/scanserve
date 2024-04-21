import { createSlice } from "@reduxjs/toolkit";

const ItemsUserModeReducer = createSlice({
    name:"ItemsUserMode",
    initialState:{
        Items:[],
    },
    reducers:{
        setItems:(state, action)=>{
            state.Items = action.payload;
        }
    }
})

export const {setItems} = ItemsUserModeReducer.actions;

export default ItemsUserModeReducer.reducer;