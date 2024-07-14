import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "../component/FilterProduct";
import CardFeature from "../component/CardFeature";
import loadingAnimation from "../media/loading-animation.gif";

//get product list
const Products = () => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [
    "All",
    ...new Set(productData.map((el) => el.category)),
  ];

  // Filter data display
  const [filterBy, setFilterBy] = useState("All");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    if (category === "All") {
      setDataFilter(productData);
    } else {
      const filter = productData.filter(
        (el) => el.category.toLowerCase() === category.toLowerCase()
      );
      setDataFilter(filter);
    }
    setFilterBy(category);
  };

  //handle image not being loaded
  if (!productData.length) {
    return (
      <div className="flex flex-col items-center pb-20">
        <h4 className="pt-6 pb-4 font-bold text-xl text-slate-700">Filters:</h4>
      <div className="flex gap-8">
        {categoryList.map((el, index) => (
          <FilterProduct
            key={index}
            category={el}
            onClick={() => handleFilterProduct(el)}
            isSelected={filterBy === el}
          />
        ))}
      </div>
        <div className="flex gap-10 pt-10 flex-wrap justify-center">
          {Array(8).fill().map((_, index) => (
            <div key={index} className="bg-slate-200 drop-shadow-lg py-5 px-4 rounded-lg min-w-[212px] min-h-[276px] flex flex-col justify-center items-center">
              <div className="w-16">
                <img src={loadingAnimation} alt="Loading" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pb-20">
      <h4 className="pt-6 pb-4 font-bold text-xl text-slate-700">Filters:</h4>
      <div className="flex gap-8">
        {categoryList.map((el, index) => (
          <FilterProduct
            key={index}
            category={el}
            onClick={() => handleFilterProduct(el)}
            isSelected={filterBy === el}
          />
        ))}
      </div>
      <div className="flex gap-10 pt-10 flex-wrap justify-center">
        {dataFilter.map((el, index) => (
            <CardFeature
              key={index}
              id = {el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
            />
        ))}
      </div>
    </div>
  );
};

export default Products;
