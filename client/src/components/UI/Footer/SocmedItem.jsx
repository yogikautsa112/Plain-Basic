import React from "react";

export default function SocmedItem({ link, icon }) {
  return (
    <a href={link}>
      <img src={icon} alt="" />
    </a>
  );
}
