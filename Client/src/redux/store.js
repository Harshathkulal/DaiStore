// Redux store setup
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { loadUserInfoFromStorage } from "./cartSlice";

// Load user info from local storage
const persistedUserInfo = localStorage.getItem("userInfo");
const initialUserInfo = persistedUserInfo
  ? JSON.parse(persistedUserInfo)
  : null;

// Get stored cart items from local storage
const persistedCartItems = localStorage.getItem("cartItems");
const initialCartItems = persistedCartItems
  ? JSON.parse(persistedCartItems)
  : [];
const initialCartCount = initialCartItems.reduce(
  (count, item) => count + item.quantity,
  0
);

const initialState = {
  cart: {
    cartItems: initialCartItems,
    cartCount: initialCartCount,
    userInfo: initialUserInfo,
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: initialState,
});

// After the store creation, dispatch the thunk action to load user info
store.dispatch(loadUserInfoFromStorage());

export default store;
