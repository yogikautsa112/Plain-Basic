import React from "react";
import AppLogo from "../AppLogo";
import SocmedItem from "./SocmedItem";
import FooterMenu from "./FooterMenu";

export default function Footer() {
  return (
    <footer className="py-6 bg-black text-white">
      <div className="custom-container space-y-6 md:flex md:justify-between">
        <div className="space-y-6">
          <AppLogo theme="light" />
          <div className="flex gap-6 items-center">
            <SocmedItem icon="/assets/icons/ic-facebook.svg" link="#" />
            <SocmedItem icon="/assets/icons/ic-instagram.svg" link="#" />
            <SocmedItem icon="/assets/icons/ic-tiktok.svg" link="#" />
            <SocmedItem icon="/assets/icons/ic-youtube.svg" link="#" />
          </div>
        </div>
        <div>
          <FooterMenu />
        </div>
      </div>
      <div className="custom-container mt-12">
        <div className="h-[1px] bg-white"></div>
        <div className="py-12">
          <p className="text-center text-sm">
            © 2024 Plain Basic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
