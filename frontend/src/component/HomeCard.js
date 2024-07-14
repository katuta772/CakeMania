import React from "react";
import loadingAnimation from "../media/loading-animation.gif";

const HomeCard = ({ image, name, price, loading }) => {
  return (
    <div className="bg-slate-200 shadow-md p-2 border-solid border-2 border-orange-400 rounded-xl h-wrap min-w-[240px] max-w-[240px] min-h-[276px] flex flex-col items-center justify-between">
      {name ? (
        <>
          <div className="w-48 h-48 overflow-hidden rounded-xl">
            <img src={image} className="w-full h-full object-cover" alt={name} />
          </div>
          <h3 className="text-center text-sm pt-4 font-semibold">{name}</h3>
          <p className="text-center text-green-600 font-semibold">
            €<span className="text-slate-700">{price}</span>
          </p>
        </>
      ) : (
        <div className="w-16">
          <img src={loadingAnimation} alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default HomeCard;
