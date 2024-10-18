import { useState } from "react";
import NavLogo from "./NavLogo";
import NavAction from "./NavAction";
import "./Header.css";
import NavMobileMenu from "./NavMobileMenu";
import NavMenu from "./NavMenu";

export default function Header({
  showNavMenu = true,
  showNavAction = true,
  isLoggedIn = false,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="py-4 lg:py-6 z-50 bg-white">
      <div className="custom-container">
        <div className="flex justify-between items-center">
          {showNavMenu && <NavMenu className="hidden md:block" />}
          <NavLogo />
          {showNavAction && (
            <NavAction {...{ showMenu, setShowMenu, isLoggedIn }} />
          )}
        </div>
        <NavMobileMenu {...{ showMenu }} />
      </div>
    </header>
  );
}
