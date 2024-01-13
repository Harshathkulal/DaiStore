import { configureStore } from '@reduxjs/toolkit';
import cartSlice, { loadUserInfoFromStorage }  from './cartSlice';

const persistedCartItems = localStorage.getItem('cartItems');
const initialState = {
  cart: {
  cartItems: persistedCartItems ? JSON.parse(persistedCartItems) : [],
  cartCount: persistedCartItems ? JSON.parse(persistedCartItems).length : 0,
  },
};

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  preloadedState: initialState,
});
store.dispatch(loadUserInfoFromStorage());

export default store;
