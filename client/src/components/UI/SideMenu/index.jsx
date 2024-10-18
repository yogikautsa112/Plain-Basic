import React from "react";
import SideMenuItem from "./SideMenuItem";

export default function SideMenu() {
  return (
    <div
      className={[
        "fixed bg-white bottom-0 w-full flex items-center justify-between",
        "md:static md:max-w-[250px] md:flex-col md:gap-2",
      ].join(" ")}
    >
      <SideMenuItem
        active
        icon="truck"
        label="My Orders"
        link="/my-account/orders"
      />
      <SideMenuItem
        icon="address"
        label="Delivery Addresses"
        link="/my-account/addresses"
      />
      <SideMenuItem
        icon="user"
        label="Account Information"
        link="/my-account"
      />
    </div>
  );
}
