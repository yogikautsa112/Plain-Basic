import React, { useState, useEffect } from "react";
import FormInput from "@/Components/atoms/FormInput";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import MediaLibrary from "@/Components/molecules/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import { MdOutlineFileUpload } from "react-icons/md";
import slugify from "slugify";

export default function Manage({ category }) {
    const isEditing = category ? true : false;
    const title = isEditing ? "Editing Category" : "Create Category";
    const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
    const [mediaModalVisible, setMediaModalVisible] = useState(false); // Penambahan state untuk kontrol modal
    
    const { data, setData, post, processing, errors, put } = useForm({
        title: category?.title ?? "",
        slug: category?.slug ?? "",
        media_url:
            category?.media_url ??
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route("dashboard.categories.update", category.id));
        } else {
            post(route("dashboard.categories.store"));
        }
    };

    const handleSelectedImage = (selectedImage) => {
        setData("media_url", selectedImage.url); // Pastikan hanya mengambil URL gambar yang terpilih
        setIsMediaLibraryOpen(false);
        setMediaModalVisible(false); // Tutup modal setelah memilih gambar
    };

    const handleUploadMedia = (e) => {
        e.preventDefault();
        setIsMediaLibraryOpen(true); // Membuka MediaLibrary modal
        setMediaModalVisible(true); // Tampilkan modal
    };

    // Menangani buka/tutup modal dengan useEffect
    useEffect(() => {
        if (isMediaLibraryOpen) {
            document.getElementById("media-opener")?.click(); // Trigger modal terbuka
        }
    }, [isMediaLibraryOpen]);

    useEffect(() => {
        if (data?.title) {
            setData("slug", slugify(data?.title, { lower: true }));
        }
    }, [data?.title]);

    return (
        <DashboardLayout>
            <PageTitle
                title={title}
                links={[
                    {
                        title: "Categories",
                        active: false,
                        url: "/dashboard/categories",
                    },
                    { title: title, active: true },
                ]}
            />
            <PageSection title={`Form ${title}`}>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Title"
                        value={data?.title}
                        onChange={(e) => setData("title", e.target.value)}
                        error={errors.title}
                        onBlur={(e) => setData("title", e.target.value)}
                    />
                    <FormInput
                        label="Slug"
                        value={data?.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        error={errors.slug}
                        onBlur={(e) => setData("slug", e.target.value)}
                    />
                    <div className="mt-4">
                        <div className="w-[220px] h-[150px] rounded-lg overflow-hidden mb-2">
                            <img src={data?.media_url} alt="" />
                        </div>
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={handleUploadMedia}
                        >
                            <MdOutlineFileUpload className="w-5 h-5" />
                            Upload Media
                        </button>
                    </div>
                    <div className="mt-3 text-right">
                        <button
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </PageSection>

            {mediaModalVisible && ( // Render MediaLibrary modal saat state true
                <MediaLibrary 
                    onConfirm={handleSelectedImage} 
                />
            )}
        </DashboardLayout>
    );
}
