import React, { useEffect, useState } from "react";
import { CalendarDays, Mail, User, ShieldCheck } from "lucide-react";
import api from "../services/api";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get("/user/profile");
                setProfile(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Unable to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl animate-pulse">
                    <div className="h-8 w-40 rounded-lg bg-slate-200" />
                    <div className="mt-2 h-4 w-64 rounded bg-slate-200" />

                    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                        <div className="h-32 bg-slate-200" />

                        <div className="px-6 pb-8 sm:px-8">
                            <div className="-mt-12 h-24 w-24 rounded-2xl bg-slate-300" />

                            <div className="mt-5 h-6 w-40 rounded bg-slate-200" />
                            <div className="mt-3 h-4 w-56 rounded bg-slate-200" />

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <div className="h-24 rounded-2xl bg-slate-100" />
                                <div className="h-24 rounded-2xl bg-slate-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <ShieldCheck size={22} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-slate-950">
                        Unable to load profile
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    const name = profile?.name || "User";
    const initial = name.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        Account
                    </span>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                        View and manage your account information.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-32 bg-slate-950 sm:h-40" />

                    <div className="px-5 pb-8 sm:px-8">
                        <div className="-mt-12 flex flex-col sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-800 text-3xl font-bold text-white shadow-sm sm:h-28 sm:w-28 sm:text-4xl">
                                {initial}
                            </div>

                            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:mb-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Account Active
                            </div>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-2xl font-bold text-slate-950">
                                {name}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Interview platform member
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                                        <User size={19} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Full Name
                                        </p>
                                        <p className="mt-1 font-semibold text-slate-900">
                                            {name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Email Address
                                        </p>
                                        <p className="mt-1 truncate font-semibold text-slate-900">
                                            {profile?.email || "Not available"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <CalendarDays
                                size={19}
                                className="mt-0.5 shrink-0 text-slate-500"
                            />

                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Interview Profile
                                </p>

                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    Your account is ready to create and join
                                    interview rooms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;