import React from 'react';
import { GiForkKnifeSpoon } from "react-icons/gi";

const FilterProduct = ({ category, onClick, isSelected }) => {
    return (
        <div className='flex flex-col gap-1 items-center' onClick={onClick}>
            <div className={`text-3xl p-4 rounded-full cursor-pointer ${isSelected ? 'bg-orange-500 text-white' : 'bg-orange-300 hover:bg-orange-400'}`}>
                <GiForkKnifeSpoon />
            </div>
            <p className={`text-center font-semibold ${isSelected ? 'text-orange-500' : 'text-slate-700'}`}>{category}</p>
        </div>
    );
};

export default FilterProduct;
