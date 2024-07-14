import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/CartProduct";
import { Link } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/productSlice";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    if (user.email) {
      toast("Redirecting to payment...!");
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/payment");
      }, 1000);
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  // Calculate product total
  const productTotal = productCartItem.reduce(
    (acc, curr) => acc + parseFloat(curr.total),
    0
  );
  const qtyTotal = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  // Determine additional fees
  const deliveryFee = productTotal >= 50 ? 0 : 10;
  const packagingFee = productTotal >= 50 ? 0 : 5;
  const finalTotal = productTotal + deliveryFee + packagingFee;

  return (
    <div className="flex justify-center items-center">
      <div className="m-10 p-4 bg-white rounded-xl drop-shadow-xl w-9/12">
        <h2 className="text-2xl font-bold text-orange-600">Your Cart</h2>
        {productCartItem.length > 0 ? (
          <div className="flex">
            {/* display cart items */}
            <div className="w-3/4">
              <div>
                {productCartItem.map((el, index) => (
                  <CartProduct
                    key={index}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                    qty={el.qty}
                    total={el.total}
                  />
                ))}
              </div>
            </div>
            {/* display cart total */}
            <div className="w-1/4">
              <div className="m-2 p-4 bg-slate-200 rounded-lg">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <div className="my-2">
                  <p className="font-semibold text-slate-600">
                    Products Total Qty:{" "}
                    <span className="text-orange-500">{qtyTotal}</span> units
                  </p>
                  <p className="font-semibold text-slate-600">
                    Products Total: <span className="text-green-500">€</span>
                    <span className="text-orange-500">
                      {productTotal.toFixed(2)}
                    </span>
                  </p>
                  <p className="font-semibold text-slate-600">
                    Delivery Fee: <span className="text-green-500">€</span>
                    <span className="text-orange-500">
                      {deliveryFee.toFixed(2)}
                    </span>
                  </p>
                  <p className="font-semibold text-slate-600">
                    Packaging Fee: <span className="text-green-500">€</span>
                    <span className="text-orange-500">
                      {packagingFee.toFixed(2)}
                    </span>
                  </p>
                  <hr className="my-2" />
                  {productTotal <50 ? (
                  <h3 className="text-sm font-bold text-orange-400">
                    Orders over 50€ will have free delivery!
                  </h3>):
                  (
                    <h3 className="text-sm font-bold text-orange-400">
                    You have free delivery!
                  </h3>
                  )}
                  <p className="text-lg font-bold text-slate-700">
                    Final Total: €
                    <span className="">{finalTotal.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-center items-center">
                <Link to={"/products"}>
                  <button className="w-40 text-semibold text-sm bg-orange-600 text-slate-200 px-4 py-2 rounded-lg hover:bg-orange-700">
                    Continue Shopping
                  </button>
                </Link>
                <Link to={""} onClick={handlePayment}>
                  <button className="w-24 text-semibold text-sm bg-orange-600 text-slate-200 px-4 py-2 rounded-lg hover:bg-orange-700">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <PiSmileySad className="text-6xl text-gray-500" />
            <p className="text-xl text-gray-500 mt-4">Your cart is empty</p>
            <Link to={"/products"}>
              <button className="mt-4 w-40 text-semibold text-sm bg-orange-600 text-slate-200 px-4 py-2 rounded-lg hover:bg-orange-700">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
