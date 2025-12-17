"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginSchema } from "@/components/validations/formSchema";
import "@/components/Form/SignUp/RegistrationForm.css"; // Reusing existing styles
import { FormInput } from "@/components/Form_Input/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/libs/supabase";

export default function LoginForm() {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<LoginSchema>({
        mode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setErrorMsg(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setErrorMsg(error.message);
                return;
            }

            console.log("Login Submitted:", data);
            setShowSuccess(true);
            // Optional: redirect after delay
            setTimeout(() => {
                setShowSuccess(false);
                router.push('/dashboard');
            }, 2000);
        } catch (err) {
            console.error(err);
            setErrorMsg("An unexpected error occurred.");
        }
    };

    const closeSuccessMessage = () => {
        setShowSuccess(false);
    };

    return (
        <>
            <div className="modern-form-wrapper">
                <div className="modern-form-card">
                    <h1 className="modern-form-title">Welcome Back</h1>

                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        {errorMsg && (
                            <div style={{ color: "#ef4444", marginBottom: "1rem", textAlign: "center" }}>
                                {errorMsg}
                            </div>
                        )}
                        <div className="modern-form-grid full-width">
                            <div className="modern-input-wrapper">
                                <FormInput
                                    name="email"
                                    register={register}
                                    error={errors.email}
                                    placeholder="Email Address"
                                    type="email"
                                    className="modern-input"
                                    autoComplete="email"
                                />
                            </div>

                            <div className="modern-input-wrapper">
                                <FormInput
                                    name="password"
                                    register={register}
                                    error={errors.password}
                                    placeholder="Password"
                                    type="password"
                                    className="modern-input"
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            className="modern-submit-btn"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>

                        <div style={{ marginTop: "1.5rem", textAlign: "center", color: "#64748b" }}>
                            Don't have an account?{" "}
                            <Link href="/SignUp" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Message Modal */}
            {showSuccess && (
                <>
                    <div className="success-overlay" onClick={closeSuccessMessage}></div>
                    <div className="success-message">
                        <div className="success-icon">
                            <svg viewBox="0 0 52 52">
                                <path className="success-checkmark" d="M14 27l8 8 16-16" />
                            </svg>
                        </div>
                        <h2 className="success-title">Login Successful!</h2>
                        <p className="success-description">
                            Welcome back to your account.
                        </p>
                        <button className="success-close-btn" onClick={closeSuccessMessage}>
                            Continue
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
