import React from "react";
import { Link } from "react-router-dom";

export default function AppLogo({ theme = "dark" }) {
  return (
    <Link
      to="/"
      className={`font-bold text-lg md:text-xl ${
        theme === "dark" ? "text-black" : "text-white"
      }`}
    >
      PLAIN BASIC
    </Link>
  );
}
