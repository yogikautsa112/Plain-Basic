import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import { router, useForm } from "@inertiajs/react";
import { HiTrash } from "react-icons/hi2";
import MediaLibrary from "@/Components/molecules/MediaLibrary";

export default function Index({ media }) {
    const { data : mediaData, ...pagination } = media;

    const handleDeleteRole = (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            router.delete(route("dashboard.media.destroy", id));
        }
    };

    const handleAddMedia = () => {
        document.getElementById('media-opener').click();
    };

    const {data, setData} = useForm({
        image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    })

    const handleConfirmMedia = (selectedImage) => {
        setData('image', selectedImage?.url)
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

            <div className="w-20 h-20">
                <img src={data?.image} alt="" />
            </div>

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
                        render: (value) => {
                            console.log(value)
                            return (
                                <img
                                    src={value}
                                    className="object-cover object-center w-20 h-20 rounded-sm"
                                ></img>
                            );
                        },
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
