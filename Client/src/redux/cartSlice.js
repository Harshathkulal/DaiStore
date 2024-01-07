import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartCount: 0,
};

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
        cartCount: state.cartCount + 1,
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
          cartCount: state.cartCount - 1,
        };
      }
      return state;
    },

    //======= User start here =====//
    addUser:(state,action)=>{
      state.userInfo = action.payload
    },
    removeUser:(state)=>{
      state.userInfo = null
    },
  },
});

export const { addToCart, removeFromCart, addUser, removeUser} = cartSlice.actions;
export default cartSlice.reducer;
