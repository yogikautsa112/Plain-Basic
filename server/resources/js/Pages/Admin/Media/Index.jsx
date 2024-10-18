import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import { router } from "@inertiajs/react";
import { HiTrash } from "react-icons/hi2";
import MediaLibrary from "@/Components/molecules/MediaLibrary";

export default function Index({ media }) {
    const { data: mediaData, ...pagination } = media;

    const handleDeleteRole = (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            router.delete(route("dashboard.media.destroy", id));
        }
    };

    const handleAddMedia = () => {
        document.getElementById('media-opener').click();
    };

    const handleConfirmMedia = (selectedImage) => {
        // You might want to do something with the selected image here
        console.log(selectedImage);
    }

    return (
        <DashboardLayout>
            <PageTitle
                title="Media"
                links={[
                    { title: "Media", active: false, url: "/dashboard/media" },
                ]}
                btnLink="#"
                btnTitle={"Add New Media"}
                btnHandler={handleAddMedia}
            />

            <DataTable
                dataSource={mediaData}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (_, index) => pagination.from + index,
                    },
                    {
                        title: "Image",
                        dataIndex: "url",
                        render: (value) => (
                            <img
                                src={value}
                                className="object-cover object-center w-20 h-20 rounded-lg"
                                alt="Media"
                            />
                        ),
                    },
                    {
                        title: "Filename",
                        dataIndex: "filename",
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex items-center gap-2">
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
            <MediaLibrary
                onConfirm={handleConfirmMedia}
            />
        </DashboardLayout>
    );
}