//globle store
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import shopProductsSlice from './shop/products-slice'
import shopCartSlice from './shop/cart-slice/'
import shopAddressSlice from './shop/address-slice'
import shopSearchSlice from './shop/search-slice'

//root reducer
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopSearch : shopSearchSlice,
    }
});

export default store;//this store connect with react in main.jsx