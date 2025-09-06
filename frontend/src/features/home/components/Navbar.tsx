import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="absolute top-5 px-40 w-full z-50">
      <div className="flex items-center justify-between py-2 shadow-lg bg-white/30 backdrop-blur-md rounded-lg px-6">
        {/* Navbar Logo & branding */}
        <Link to="/">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-16" />
            <span className="uppercase tracking-wider font-bold">Invoxy</span>
          </div>
        </Link>

        {/* Navbar Links */}
        <div>
          <ul className="flex space-x-8 text-[#4F200D] font-medium">
            <li className="hover:scale-110 transition">
              <a href="#features" className="hover:text-[#6c63ff] transition">
                Features
              </a>
            </li>
            <li className="hover:scale-110 transition">
              <a href="#pricing" className="hover:text-[#6c63ff] transition">
                Pricing
              </a>
            </li>
            <li className="hover:scale-110 transition">
              <a href="#about" className="hover:text-[#6c63ff] transition">
                About
              </a>
            </li>
            <li className="hover:scale-110 transition">
              <a href="#contact" className="hover:text-[#6c63ff] transition">
                Contact
              </a>
            </li>
          </ul>
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
