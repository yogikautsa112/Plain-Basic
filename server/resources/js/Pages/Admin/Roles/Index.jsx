import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import { HiTrash } from "react-icons/hi2";
import { Link, router } from "@inertiajs/react";

export default function Index({ roles }) {
    const { data, ...pagination } = roles;

    const handleSearch = (value) => {
        console.log(value);
        router.get(route('dashboard.roles.index', {
            search: value,
        })) 
    }

    const handleDeleteRole = (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            router.delete(route("dashboard.roles.destroy", id));
        }
    };
    return (
        <DashboardLayout>
            <PageTitle
                title="Roles"
                links={[
                    { title: "Roles", active: false, url: "/dashboard/roles" },
                    { title: "Create Role", active: true },
                ]}
                btnTitle="Add New Role"
                btnLink="/dashboard/roles/create"
            />

            <DataTable
                searchable={true}
                handleSearch={handleSearch}
                dataSource={data}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (value, index) => pagination.from + index,
                    },
                    {
                        title: "Display Name",
                        dataIndex: "display_name",
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route("dashboard.roles.edit", value)}
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
