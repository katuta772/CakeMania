import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItems: (state, action) => {
      const productIndex = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex >= 0) {
        state.cartItem[productIndex].qty += 1;
        state.cartItem[productIndex].total =
          state.cartItem[productIndex].qty * state.cartItem[productIndex].price;
        toast("Product quantity increased!");
      } else {
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        toast("Product added to cart!");
      }
    },
    deleteCartItem: (state, action) => {
      console.log(action.payload);
      toast("Item has been removed!");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
      console.log("increased");
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
        console.log("decreased");
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  setDataProduct,
  addCartItems,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = productSlice.actions;
export default productSlice.reducer;
