import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center m-60">
      <h1 className="font-bold text-3xl p-10 bg-green-300 rounded-lg">
        Payment succesful
      </h1>
      <div>
        <Link to={"/"}>
          <button className="w-40 text-semibold text-sm bg-green-400 px-4 py-2 rounded-lg hover:bg-green-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
