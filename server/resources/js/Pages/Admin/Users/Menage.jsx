import FormCheck from "@/Components/atoms/FormCheck";
import FormInput from "@/Components/atoms/FormInput";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Menage({ user, roles }) {
    const isEditing = user ? true : false;

    const title = isEditing ? "Editing user" : "Create user";

    const { data, setData, post, processing, errors, put } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
        password_confirmation: "",
        roles: user?.roles?.map((role) => role.name) ?? [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (isEditing) {
            put(route("dashboard.users.update", user.id));
        } else {
            post(route("dashboard.users.store"));
        }
    };

    return (
        <DashboardLayout>
            <PageTitle
                title={title}
                links={[
                    { title: "Users", active: false, url: "/dashboard/users" },
                    { title: title, active: true },
                ]}
            />
            <PageSection title={`Form ${title}`}>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Name"
                        value={data?.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        onBlur={(e) => setData("name", e.target.value)}
                    />
                    <FormInput
                        label="Email"
                        value={data?.email}
                        disabled={isEditing}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        onBlur={(e) => setData("email", e.target.value)}
                    />
                    <FormInput
                        label="Password"
                        value={data?.password}
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        onBlur={(e) => setData("password", e.target.value)}
                    />
                    <FormInput
                        label="Password Confirmation"
                        value={data?.password_confirmation}
                        type="password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.email}
                        onBlur={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <FormCheck
                        label="Roles"
                        value={data?.roles}
                        error={errors.roles}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setData("roles", [
                                    ...data.roles,
                                    e.target.value,
                                ]);
                            } else {
                                setData(
                                    "roles",
                                    data.roles?.filter(
                                        (role) => role !== e.target.value
                                    )
                                );
                            }
                        }}
                        options={roles.map(
                            (role) => (
                                console.log(role),
                                {
                                    label: role.display_name,
                                    value: role.name,
                                }
                            )
                        )}
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
