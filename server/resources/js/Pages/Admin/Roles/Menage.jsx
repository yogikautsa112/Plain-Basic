import FormInput from "@/Components/atoms/FormInput";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Menage({ role }) {
    const isEditing = role ? true : false;

    const title = isEditing ? "Editing Role" : "Create Role";

    const { data, setData, post, processing, errors, put } = useForm({
        name: role?.name ?? "",
        display_name: role?.display_name ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (isEditing) {
            put(route("dashboard.roles.update", role.id));
        } else {
            post(route("dashboard.roles.store"));
        }
    };

    return (
        <DashboardLayout>
            <PageTitle
                title={title}
                links={[
                    { title: "Roles", active: false, url: "/dashboard/roles" },
                    { title: title, active: true },
                ]}
            />
            <PageSection title={`Form ${title}`}>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Display Name"
                        value={data?.display_name}
                        onChange={(e) =>
                            setData("display_name", e.target.value)
                        }
                        error={errors.display_name}
                        onBlur={(e) => setData("display_name", e.target.value)}
                    />
                    <FormInput
                        label="Name"
                        value={data?.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        onBlur={(e) => setData("name", e.target.value)}
                    />
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
