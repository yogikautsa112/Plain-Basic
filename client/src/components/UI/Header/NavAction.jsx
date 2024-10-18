import {
  IconMenu,
  IconMenu2,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function NavAction({ showMenu, setShowMenu, isLoggedIn }) {
  return (
    <div className="nav-action">
      <button className="scale-effect">
        <IconShoppingCart stroke={1} />
      </button>
      <button
        className="md:hidden scale-effect"
        onClick={() => setShowMenu(!showMenu)}
      >
        <IconMenu2 stroke={1} />
      </button>
      {isLoggedIn ? (
        <>
          <Link to="/my-account" className="scale-effect">
            <IconUser stroke={1} />
          </Link>
        </>
      ) : (
        <>
          <Link to="/auth/login">
            <button
              to="/auth/login"
              className="btn btn-primary btn-outline hidden md:inline-block"
            >
              Login
            </button>
          </Link>
          <Link to="/auth/register">
            <button className="btn btn-primary hidden md:inline-block">
              Register
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
