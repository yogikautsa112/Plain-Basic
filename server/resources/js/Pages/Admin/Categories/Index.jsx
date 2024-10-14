import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import { HiTrash } from "react-icons/hi2";
import { Link, router } from "@inertiajs/react";

export default function Index({ categories }) {
    const { data, ...pagination } = categories;

    const handleSearch = (value) => {
        console.log(value);
        router.get(route('dashboard.categories.index', {
            search: value,
        })) 
    }

    const handleDeleteRole = (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            router.delete(route("dashboard.categories.destroy", id));
        }
    };
    return (
        <DashboardLayout>
            <PageTitle
                title="Categories"
                links={[
                    { title: "Categories", active: false, url: "/dashboard/categories" },
                ]}
                btnTitle="Add New Category"
                btnLink="/dashboard/categories/create"
            />

            <DataTable
                searchable={true}
                handleSearch={handleSearch}
                dataSource={data}
                columns={[
                    {
                        title: "No",
                        dataIndex: "display_name",
                        render: (value, index) => pagination.from + index,
                    },
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Slug",
                        dataIndex: "slug",
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route("dashboard.categories.edit", value)}
                                    className="btn btn-success"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteRole(value)}
                                    className="btn btn-error"
                                >
                                    <HiTrash />
                                </button>
                            </div>
                        ),
                    },
                ]}
                pagination={pagination}
            />
        </DashboardLayout>
    );
}
