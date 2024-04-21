import { createSlice } from "@reduxjs/toolkit";

const CartItemsReducer = createSlice({
    name:"cartItems",
    initialState:{
        CartItems:localStorage.getItem('CartItems')?JSON.parse(localStorage.getItem('CartItems')):[],
        cartTotalQuantity:0,
        cartSubTotalAmount:0,
    },
    reducers:{
        setCartItems(state, action){
            var itemIndex = state.CartItems.findIndex((x)=>x._id===action.payload._id);
            if(itemIndex>=0){
                state.CartItems[itemIndex].cartQuantity +=action.payload.cartQuantity;
            }else{
                state.CartItems.push(action.payload);
            }

            localStorage.setItem('CartItems', JSON.stringify(state.CartItems));
        },
        removeCartItems(state,action){
            var tempItems = state.CartItems.filter((x)=>x._id!==action.payload)
            state.CartItems = tempItems ;
            localStorage.setItem('CartItems', JSON.stringify(state.CartItems));
        },
        increementCartItem(state,action){
            var itemIndex = state.CartItems.findIndex((x)=>x._id===action.payload);
            state.CartItems[itemIndex].cartQuantity +=1;
            localStorage.setItem('CartItems', JSON.stringify(state.CartItems));
        },
        decreementCartItem(state,action){
            var itemIndex = state.CartItems.findIndex((x)=>x._id===action.payload);
            state.CartItems[itemIndex].cartQuantity -=1;
            localStorage.setItem('CartItems', JSON.stringify(state.CartItems));
        },
        getTotals(state, action){
            let {subTotalAmount, totalQuantity} = state.CartItems.reduce((obj, x)=>{
                const {price, cartQuantity} = x;

                obj.subTotalAmount += price*cartQuantity;
                obj.totalQuantity += cartQuantity;

                return obj;
            }, 
            {//this is "obj"
                subTotalAmount:0, 
                totalQuantity:0
            });

            state.cartSubTotalAmount = subTotalAmount;
            state.cartTotalQuantity = totalQuantity;
        }
    }
})

export const {setCartItems, removeCartItems, increementCartItem, decreementCartItem, getTotals} = CartItemsReducer.actions;

export default CartItemsReducer.reducer;