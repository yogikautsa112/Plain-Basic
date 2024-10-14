import FormInput from "@/Components/atoms/FormInput";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Menage({ category }) {
    const isEditing = category ? true : false;

    const title = isEditing ? "Editing Category" : "Create Category";

    const { data, setData, post, processing, errors, put } = useForm({
        title: category?.title ?? "",
        slug: category?.slug ?? "",
        media_url: category?.media_url ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (isEditing) {
            put(route("dashboard.categories.update", category.id));
        } else {
            post(route("dashboard.categories.store"));
        }
    };

    return (
        <DashboardLayout>
            <PageTitle
                title={title}
                links={[
                    { title: "Categories", active: false, url: "/dashboard/categories" },
                    { title: title, active: true },
                ]}
            />
            <PageSection title={`Form ${title}`}>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Title"
                        value={data?.title}
                        onChange={(e) =>
                            setData("title", e.target.value)
                        }
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
                    <div>
                        <div>
                        <img
                            className="w-100"
                            src={data?.media_url}
                            alt={data?.title}
                        />
                        <input
                            type="file"
                            onChange={(e) => {
                                setData("media_url", URL.createObjectURL(
                                    e.target.files[0]
                                ));
                            }}
                        />
                        </div>
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
        </DashboardLayout>
    );
}
