import React from "react";
import { TbExposurePlus1 } from "react-icons/tb";
import { TbExposureMinus1 } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlice";

const CartProduct = ({ id, name, image, price, qty, total }) => {
  const dispatch = useDispatch();

  return (
    <div className="mt-2 mb-2">
      <div className="p-4 h-36 bg-slate-200 rounded-xl flex items-center gap-4 min-w-full">
        <img src={image} className="w-20 object-cover" />
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center">
              <h1 className="font-semibold text-orange-600">{name}</h1>
              <span className="ml-auto cursor-pointer text-slate-400 hover:text-orange-400" onClick={()=>dispatch(deleteCartItem(id))}>
                <MdDelete />
              </span>
            </div>
            <h1>
              <span className="text-green-600 font-semibold">€</span>
              {price}
            </h1>
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="mt-2 text-slate-700">Quantity: {qty}</h3>
              <div className="flex gap-1">
                <button className=" bg-slate-400 text-slate-200 py-1 rounded-md w-10 hover:bg-slate-300 flex justify-center items-center gap-2">
                  <div className="text-sm font-semibold text-black" onClick={()=>dispatch(decreaseQty(id))}>
                    <TbExposureMinus1 />
                  </div>
                </button>
                <button className=" bg-slate-400 text-slate-200 py-1 rounded-md w-10 hover:bg-slate-300 flex justify-center items-center gap-2">
                  <div className="text-sm font-semibold text-black" onClick={()=>dispatch(increaseQty(id))}>
                    <TbExposurePlus1 />
                  </div>
                </button>
              </div>
            </div>
            <div className="text-orange-600 font-semibold self-end">
              Total: <span className="text-green-600 font-semibold">€</span>
              <span className="text-slate-700">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
