import MenuLink from "@/Components/atoms/MenuLink";
import { Link, router, usePage } from "@inertiajs/react";
import {
    HiOutlineArchiveBox,
    HiOutlineHome,
    HiOutlineUsers,
} from "react-icons/hi2";
import { BsCardImage } from "react-icons/bs";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardLayout({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <div className="w-full overflow-x-hidden">
            <header className="fixed top-0 left-0 z-50 w-full shadow navbar bg-base-100">
                <div className="flex-1">
                    <a className="text-xl btn btn-ghost">daisyUI</a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={`https://ui-avatars.com/api/?name=John Doe`}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link
                                    href="/dashboard/profile"
                                    className="justify-between"
                                >
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>

                            <li>
                                <a onClick={() => router.post(route("logout"))}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <aside className="bg-gray-900 w-56 fixed top-0 left-0 w-[250px] h-full z-[60]">
                <div className="p-6">
                    <a className="font-bold text-white navbar-brand">Dashboard</a>
                </div>
                <ul className="w-full menu">
                    <MenuLink
                        icon={<HiOutlineHome />}
                        link="/dashboard"
                        title="Dashboard"
                    />

                    <MenuLink
                        icon={<HiOutlineArchiveBox />}
                        link="/dashboard/products"
                        title="Products"
                        items={[
                            {
                                link: "/dashboard/products",
                                title: "All Products",
                            },
                            {
                                link: "/dashboard/products/create",
                                title: "Add New Product",
                            },
                            {
                                link: "/dashboard/categories",
                                title: "Categories",
                            },
                        ]}
                    />
                    <MenuLink
                        icon={<BsCardImage />}
                        link="/dashboard/media"
                        title="Media"
                    />
                    <MenuLink
                        icon={<HiOutlineUsers />}
                        link="/dashboard/users"
                        title="Authentication"
                        items={[
                            {
                                link: "/dashboard/users",
                                title: "All Users",
                            },
                            {
                                link: "/dashboard/roles",
                                title: "Roles",
                            },
                            {
                                link: "/dashboard/permissions",
                                title: "Permissions",
                            },
                        ]}
                    />
                </ul>
            </aside>
            <div className="main-content w-full pl-[250px] pt-[90px] bg-base-200">
                <div className="custom-container space-y-4 min-h-[100vh] pb-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
