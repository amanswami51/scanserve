import { createSlice } from "@reduxjs/toolkit";

const AddmenuItemsReducer = createSlice({
    name:"AddmenuItems",
    initialState:{
        AddmenuItems:[]
    },
    reducers:{
        setAddmenuItems:(state, action)=>{
            state.AddmenuItems = action.payload;
        }
    }
})

export const {setAddmenuItems} = AddmenuItemsReducer.actions;

export default AddmenuItemsReducer.reducer;