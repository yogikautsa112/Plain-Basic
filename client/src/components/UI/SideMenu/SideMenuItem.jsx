import { IconMap2, IconTruck, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const iconMapper = {
  truck: <IconTruck />,
  address: <IconMap2 />,
  user: <IconUser />,
};

export default function SideMenuItem({ active, icon, label, link }) {
  return (
    <Link
      to={link}
      className={[
        // mobile
        "flex flex-col items-center justify-center w-full py-2",
        active ? "border-t-2 border-black" : "border-t border-gray-100 px-4",
        "md:flex-row md:border-0 md:rounded-lg md:py-4 md:justify-start md:px-6 md:gap-3",
        active ? "md:bg-black md:text-white" : "md:hover:bg-gray-100",
      ].join(" ")}
    >
      {iconMapper[icon]}
      <span
        className={[
          "text-xs font-medium text-center md:text-left md:text-sm",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}
