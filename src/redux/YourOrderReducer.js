import { createSlice } from "@reduxjs/toolkit";

const YourOrderReducer = createSlice({
    name:"YourOrder",
    initialState:{
        yourOrder:localStorage.getItem('yourorder')?JSON.parse(localStorage.getItem('yourorder')):[],
    },
    reducers:{
        setYourOrder:(state, action)=>{
            console.log(action.payload);
            state.yourOrder.push(action.payload);
            localStorage.setItem('yourorder', JSON.stringify(state.yourOrder));
        }
    }
})

export const {setYourOrder} = YourOrderReducer.actions;

export default YourOrderReducer.reducer;