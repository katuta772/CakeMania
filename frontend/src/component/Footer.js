import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center p-6 bg-neutral-700 text-white">
      <div className="flex gap-[300px]">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-orange-600">OPENING HOURS:</h1>
          <div>
            <ul className="text-sm">
              <li>MONDAY: 9:00 - 20:00</li>
              <li>TUESDAY: 9:00 - 20:00</li>
              <li>WEDNESDAY: 9:00 - 20:00</li>
              <li>THURSDAY: 9:00 - 20:00</li>
              <li>FRIDAY: 9:00 - 20:00</li>
              <li>SATURDAY: 9:00 - 20:00</li>
              <li>SUNDAY: 9:00 - 20:00</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-orange-600">MENU:</h4>
          <div className="flex flex-col gap-1">
            <Link to={""}>Home</Link>
            <Link to={"products"}>Products</Link>
            <Link to={"cart"}>Checkout</Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-orange-600">CONTACT:</h4>
          <div className="flex flex-col gap-1">
            <p>Phone: +40728276483</p>
            <p>E-mail: gogancatalin20@stud.ase.ro</p>
            <h4>Social media:</h4>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>&copy; Copyright 2023 CakeMania Bakery</p>
      </div>
    </div>
  );
};

export default Footer;