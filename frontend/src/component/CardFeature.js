import React from "react";
import { CiShoppingBasket } from "react-icons/ci";
import loadingAnimation from "../media/loading-animation.gif";
import { Link } from "react-router-dom";
import { addCartItems } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeature = ({ name, price, category, image, id }) => {
  const dispatch = useDispatch();
  const handleAddToCartProduct = (e) => {
    dispatch(
      addCartItems({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="bg-slate-200 drop-shadow-lg py-5 px-4 rounded-lg min-w-[240px] max-w-[240px] min-h-[340px] max-h-[340px] flex flex-col justify-between items-center">
      {image ? (
        <>
          <Link
            to={`/products/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="w-40 h-40 rounded-2xl overflow-hidden">
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt={name}
                />
              </div>
              <p className="text-center text-sm pt-4 font-semibold">{name}</p>
            </div>
          </Link>
          <div className="text-center pt-4">
            <p className="text-center text-green-600 font-semibold mb-2">
              €<span className="text-slate-700">{price}</span>
            </p>
            <button
              className="bg-orange-600 text-slate-200 py-1 rounded-lg w-40 hover:bg-orange-700 flex justify-center items-center gap-2"
              onClick={handleAddToCartProduct}
            >
              <div className="text-2xl">
                <CiShoppingBasket />
              </div>
              Add to Cart
            </button>
          </div>
        </>
      ) : (
        <div className="w-16">
          <img src={loadingAnimation} alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default CardFeature;
