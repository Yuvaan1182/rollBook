import React from "react";
import { Link } from "react-scroll";

const NavLinks = () => {
  return (
    <ul className="flex space-x-8 text-[#4F200D] font-medium">
      <li className="hover:scale-110 transition">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="hover:text-[#6c63ff] transition"
        >
          Home
        </Link>
      </li>
      <li className="hover:scale-110 transition">
        <Link
          to="features"
          smooth={true}
          duration={500}
          className="hover:text-[#6c63ff] transition"
        >
          Features
        </Link>
      </li>
      <li className="hover:scale-110 transition">
        <Link
          to="pricing"
          smooth={true}
          duration={500}
          className="hover:text-[#6c63ff] transition"
        >
          Pricing
        </Link>
      </li>
      <li className="hover:scale-110 transition">
        <Link
          to="contact"
          smooth={true}
          duration={500}
          className="hover:text-[#6c63ff] transition"
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
