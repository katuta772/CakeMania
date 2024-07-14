import React, { useState } from "react";
import logo from "../media/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    setTimeout(() => {
      navigate("/");
    }, 1000);
    toast("You have successfully logged out!");
  };

  const cartItemCount = useSelector((state)=>state.product.cartItem)

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10 md:h-16 flex items-center">
            <img src={logo} className="h-full" alt="CakeMania Bakery logo" />
            <h1 className="text-xs md:text-base">CakeMania Bakery</h1>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-7">
          <nav className="flex gap-2 md:gap-6 text-xs md:text-lg">
            <Link to={""} className="hover:text-orange-600">
              Home
            </Link>
            <Link to={"products"} className="hover:text-orange-600">
              Products
            </Link>
            <Link to={"about"} className="hover:text-orange-600">
              About
            </Link>
            <Link to={"contact"} className="hover:text-orange-600">
              Contact
            </Link>
          </nav>
          <div className="text-2xl text-slate-600 relative cursor-pointer">
            <Link to={"cart"} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
              <FaShoppingCart />
              <div className="flex items-center justify-center absolute -top-2 -right-2 text-white bg-orange-600 h-4 w-4 p-0 rounded-full m-0 text-sm text-center">
                {cartItemCount.length}
              </div>
            </Link>
          </div>
          <div
            className="text-slate-600 cursor-pointer"
            onClick={handleShowMenu}
          >
            <div className="text-2xl md:text-3xl">
              {userData.firstName ? (
                <p className="text-base text-orange-600">
                  Hello, {userData.firstName}
                </p>
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-whadow-md flex flex-col">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"new_Product"}
                    className="whitespace-nowrap cursor-pointer hover:text-orange-600"
                  >
                    New Product
                  </Link>
                )}

                {userData.firstName ? (null)
                :
                (
                  <Link
                  to={"login"}
                  className="whitespace-nowrap cursor-pointer hover:text-orange-600"
                >
                  Login
                </Link>
                )}

                {userData.firstName ? (
                  <p
                    className="cursor-pointer text-orange-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"sign_up"}
                    className="whitespace-nowrap cursor-pointer hover:text-orange-600"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
