import NavMenu from "./NavMenu";

export default function NavMobileMenu({ showMenu }) {
  return (
    <div className={["nav-mobile-menu", showMenu ? "show" : ""].join(" ")}>
      <NavMenu />
    </div>
  );
}
