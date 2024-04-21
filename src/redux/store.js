import { configureStore } from "@reduxjs/toolkit";
import ItemDetailInfoReducer from "./ItemDetailInfoReducer";
import AddmenuItemsReducer from "./AddmenuItemsReducer";
import ItemsUserModeReducer from "./ItemsUserModeReducer";
import CartItemsReducer from "./CartItemsReducer";
import YourOrderReducer from "./YourOrderReducer";

const store = configureStore({
    reducer:{
        ItemsUserMode:ItemsUserModeReducer,
        ItemDetailInfo:ItemDetailInfoReducer,
        cartItems:CartItemsReducer,
        AddmenuItems:AddmenuItemsReducer,
        YourOrder:YourOrderReducer
    }
})

export default store;