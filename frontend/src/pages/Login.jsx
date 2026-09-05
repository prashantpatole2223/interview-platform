import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    LogIn
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
                    <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
                                <LogIn size={23} />
                            </div>

                            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Welcome back
                            </p>

                            <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
                                Your next interview
                                <span className="block text-slate-400">
                                    starts here.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                                Sign in to create interview rooms, join
                                sessions, and continue managing your
                                interviews.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Create and manage interview rooms",
                                "Join rooms using secure room codes",
                                "Access your interview history"
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-emerald-400"
                                    />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 lg:p-12">
                        <div className="mx-auto max-w-md">
                            <div className="lg:hidden">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                                    <LogIn size={21} />
                                </div>
                            </div>

                            <div className="mt-6 lg:mt-0">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                                    Welcome back
                                </h1>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Sign in to continue to your account.
                                </p>
                            </div>

                            {error && (
                                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-7 space-y-5"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-100"
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-slate-700"
                                        >
                                            Password
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            required
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-100"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            Login
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform group-hover:translate-x-0.5"
                                            />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="mt-7 text-center text-sm text-slate-500">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-slate-950 hover:underline"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;