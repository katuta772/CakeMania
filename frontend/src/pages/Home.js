import React from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCardList = productData.slice(0, 4);

  const loadingArray = new Array(4).fill(null);
  return (
    <div className="p-2 md:py-4 px-8 h-full">
      <div className="md:flex items-center justify-center gap-4 p-6">
        <div className="md:w-1/2">
          <div className="flex gap-2 bg-green-300 w-48 px-2 items-center rounded-full">
            <p className="text-sm font-medium">Eco-Friendly Delivery</p>
            <img
              src="https://www.svgrepo.com/show/19878/bike.svg"
              className="h-7"
            ></img>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl text-slate-700 md:text-8xl font-bold py-3">
              The best products at the best{" "}
              <span className="text-orange-600">PRICES</span>, only for you!
            </h2>
            <p className="pt-4 text-base text-slate-500">
              From our freshly baked cakes to our delicious pastries, every
              treat is made with love and the finest ingredients. Indulge in our
              wide selection of desserts and experience the taste of pure joy
              with every bite. At CakeMania Bakery, we are dedicated to bringing
              you the sweetest moments of happiness.
            </p>
            <p className="text-base text-slate-500">
              Our skilled bakers craft each product with precision and care,
              ensuring that every bite is a delightful experience. Whether
              you're looking for a special cake for a celebration, a box of
              assorted pastries for a gathering, or just a sweet treat to
              brighten your day, we have something for everyone.
            </p>
            <p className=" pb-4 text-base text-slate-500">
              Thank you for choosing CakeMania Bakery – your destination for the
              best baked goods in town. We can't wait to serve you!
            </p>
            <Link to={"products"}>
              <button className="w-32 text-bold bg-orange-600 text-slate-200 px-4 py-2 rounded-lg hover:bg-orange-700">
                Order Now
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2">
          <div className="text-xl font-bold pt-10 text-slate-700 md:text-2xl">
            Popular choices:
          </div>
          <div className="flex flex-wrap gap-5 p-4 justify-center items-center">
            {homeProductCardList[0]
              ? homeProductCardList.map((el,index) => {
                  return (
                    <Link
                      to={`/products/${el._id}`}
                      key={el._id}
                      onClick={() =>
                        window.scrollTo({ top: "0", behavior: "smooth" })
                      }
                    >
                      <HomeCard
                        key={el._id}
                        image={el.image}
                        name={el.name}
                        price={el.price}
                      />
                    </Link>
                  );
                })
              : loadingArray.map((el, index) => {
                  return <HomeCard />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
