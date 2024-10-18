import React from "react";
import { Link } from "react-router-dom";

export default function NavMenu({ className }) {
  return (
    <ul
      className={`space-y-3 w-[95%] mx-auto md:w-auto md:m-0 md:flex md:space-y-0 md:gap-4 lg:gap-6 xl:gap-8 ${className}`}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/">Support</Link>
      </li>
      <li className="md:hidden">
        <Link to="/auth/login">Login</Link>
      </li>
      <li>
        <Link to="/auth/register" className="md:hidden">
          Register
        </Link>
      </li>
    </ul>
  );
}
