import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <div className="fixed top-2 px-40 w-full z-50">
      <div className="flex items-center justify-between py-2 shadow-lg bg-white/30 backdrop-blur-md rounded-lg px-6">
        {/* Navbar Logo & branding */}
        <Link to="home">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-16" />
            <span className="uppercase tracking-wider font-bold">Invoxy</span>
          </div>
        </Link>

        {/* Navbar Links */}
        <div>
          <NavLinks />
        </div>

        {/* Navbar Actions */}
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/login"
                className="px-6 py-2 border border-[#3f3d56] bg-[#3f3d56] rounded hover:text-[#3f3d56] hover:bg-white transition text-white"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
