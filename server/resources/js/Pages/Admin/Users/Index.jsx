import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import { HiTrash } from "react-icons/hi2";
import { Link, router } from "@inertiajs/react";
import { formatDate } from "@/utils";

export default function Index({ users }) {
    const { data, ...pagination } = users;

    const handleSearch = (value) => {
        console.log(value);
        router.get(
            route("dashboard.users.index", {
                search: value,
            })
        );
    };

    const handleDeleteRole = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            router.delete(route("dashboard.users.destroy", id));
        }
    };

    const handleSorterColumns = (sortField, sortDirection) => {
        router.get(route("dashboard.users.index", {
            sortField,
            sortDirection,
        }))
    }

    return (
        <DashboardLayout>
            <PageTitle
                title="Users"
                links={[
                    { title: "Users", active: false, url: "/dashboard/users" },
                ]}
                btnTitle="Add New User"
                btnLink="/dashboard/users/create"
            />

            <DataTable
                searchable={true}
                handleSearch={handleSearch}
                dataSource={data}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (_, index) => pagination.from + index,
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        sorter: true 
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        render: (value, _, record) => {
                            return (
                                <span>
                                    {value}{" "}
                                    {record.email_verified_at && (
                                        <span className="ml-3 btn btn-success btn-sm">
                                            Verified
                                        </span>
                                    )}
                                </span>
                            );
                        },
                    },
                    {
                        title: "Role",
                        dataIndex: "roles",
                        render: (roles) => (
                            <div className="flex flex-wrap gap-2">
                                {roles.map((role, index) => (
                                    <span
                                        key={`role-${index}`}
                                        className="btn btn-primary btn-outline btn-sm"
                                    >
                                        {role.display_name}
                                    </span>
                                ))}
                            </div>
                        ),
                    },
                    {
                        title: "Join Date",
                        dataIndex: "created_at",
                        render: (value) => formatDate(value),
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route("dashboard.users.edit", value)}
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
                handleSorterColumns={handleSorterColumns}
            />
        </DashboardLayout>
    );
}
