import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiShoppingBasket } from "react-icons/ci";
import CardFeature from "../component/CardFeature";
import { Link } from "react-router-dom";
import loadingAnimation from "../media/loading-animation.gif";
import { addCartItems } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const Product = () => {
  const { productId } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const product = productData.find((el) => el._id === productId);
  const dispatch = useDispatch();

  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) {
    return (
      <div className="p-10 flex flex-col items-center justify-center">
        <div className="min-h-[400px] py-6 flex flex-row max-w-3xl w-full bg-white shadow-md rounded-lg">
          <div className="w-1/2 p-8 flex justify-center items-center">
            <img
              src={loadingAnimation}
              className="object-fill w-1/2 h-1/2 rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const relatedProducts = productData.filter(
    (el) => el.category === product.category && el._id !== product._id
  );

  const handleAddToCartProduct = (e) => {
    dispatch(addCartItems(product));
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="min-h-[400px] py-6 flex flex-row max-w-3xl w-full bg-white shadow-md rounded-lg">
        <div className="w-1/2 p-8 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain max-h-full max-w-full rounded-lg"
          />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-lg mb-4">
              {showFullDescription ? product.description : `${product.description.slice(0, 160)}${product.description.length > 160 ? '...' : ''}`}
            </p>
            {product.description.length > 160 && (
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read less" : "Read more"}
              </button>
            )}
          </div>
          <div className="flex justify-center gap-10 py-4">
            <p className="text-xl font-semibold">
              Price:{" "}
              <span className="text-green-600 font-semibold">
                €{product.price}
              </span>
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
        </div>
      </div>
      <div className="w-full max-w-5xl mt-10">
        <h3 className="text-center text-xl font-semibold mb-4">
          Related Products
        </h3>
        <div className="flex items-center justify-center gap-6 overflow-x-auto">
          {relatedProducts.map((el) => (
            <CardFeature
              key={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
