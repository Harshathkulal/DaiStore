import { createSlice } from '@reduxjs/toolkit';

// Load user info from local storage if available
const loadUserInfoFromStorage = () => {
  return (dispatch) => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    if (userInfo) {
      dispatch(addUser(userInfo));
    }
  };
};

const initialState = {
  cartItems:[],
  cartCount: 0,
  userInfo: loadUserInfoFromStorage(),
};

// Calculate initial cartCount based on quantities of items
initialState.cartCount = initialState.cartItems.reduce((count, item) => count + item.quantity,0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const updatedCartItems = [...state.cartItems, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: updatedCartItems.reduce((count, item) => count + item.quantity, 0),
      };
    },

    updateCart: (state, action) => {
      const updatedCartItems = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: updatedCartItems.reduce((count, item) => count + item.quantity, 0), // Update cartCount based on the length of updatedCartItems
      };
    },
    
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      const indexToRemove = state.cartItems.findIndex(item => item.id === itemToRemove.id);
      
      if (indexToRemove !== -1) {
        const updatedCartItems = [
          ...state.cartItems.slice(0, indexToRemove),
          ...state.cartItems.slice(indexToRemove + 1)
        ];

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return {
          ...state,
          cartItems: updatedCartItems,
          cartCount: updatedCartItems.reduce((count, item) => count + item.quantity, 0), // Update cartCount based on the sum of quantities
        };
      }
      return state;
    },

    decreaseCartItemQuantity: (state, action) => {
      const { id } = action.payload;
      const existingCartItem = state.cartItems.find((item) => item.id === id);

      if (existingCartItem && existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        state.cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
      }
    },

    

    //======= User start here =====//
     // Update the addUser reducer to directly set userInfo without affecting local storage
     addUser: (state, action) => {
      state.userInfo = action.payload;
    },

    removeUser:(state)=>{
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { addToCart, updateCart, removeFromCart, addUser, removeUser, decreaseCartItemQuantity} = cartSlice.actions;
export { loadUserInfoFromStorage }; // Export the loadUserInfoFromStorage function
export default cartSlice.reducer;
