import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      if (typeof action.payload === "object") {
        // Decrease quantity
        const item = state.cartItems.find(item => item.id === action.payload.id);
        if (item) {
          item.quantity -= action.payload.quantity;
          if (item.quantity <= 0) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
          }
        }
      } else {
        // Remove item completely
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
