"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/components/validations/formSchema";
import { useLocalStorage } from "@/components/hooks/useLocalStorage";
import { PersonalInformation } from "@/components/Personal_Information/PersonalInformation";
import { LocationDetails } from "@/components/Location_Detail/LocationDetails";
import { Security } from "@/components/Security/Security";
import { TermsConditions } from "@/components/Form/TermsConditions";
import type { FormData } from "@/components/types/form.type";
import "@/components/Form/SignUp/RegistrationForm.css";
import { supabase } from "@/app/libs/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultFormValues: FormData = {
  fullName: "",
  email: "",
  phone: "",
  age: 0,
  dateofbirth: "",
  gender: "",
  country: "",
  city: "",
  address: "",
  password: "",
  confirmPassword: "",
  termsAccepted: undefined,
};

export default function Form() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(formSchema) as any,
    defaultValues: defaultFormValues,
  });

  const [savedFormData, setSavedFormData, clearFormData] =
    useLocalStorage<FormData>({
      key: "formData",
      initialValue: defaultFormValues,
    });

  /* ===============================
     Restore NON-SENSITIVE data
  =============================== */
  useEffect(() => {
    if (savedFormData && Object.keys(savedFormData).length > 0) {
      reset({
        ...savedFormData,
        password: "",
        confirmPassword: "",
      });
    }
  }, []);

  /* ===============================
     Save form to localStorage
     (EXCLUDING passwords)
  =============================== */
  useEffect(() => {
    const subscription = watch((value) => {
      const { password, confirmPassword, ...safeData } = value;
      setSavedFormData(safeData as FormData);
    });

    return () => subscription.unsubscribe();
  }, [watch, setSavedFormData]);

  /* ===============================
     🔥 Fix BACK button (bfcache)
  =============================== */
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        reset(defaultFormValues);
        clearFormData();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [reset, clearFormData]);

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
            date_of_birth: data.dateofbirth,
            gender: data.gender,
            country: data.country,
            city: data.city,
            address: data.address,
          },
        },
      });

      if (authError) {
        setErrorMsg(authError.message);
        return;
      }

      setShowSuccess(true);
      clearFormData();
      reset(defaultFormValues);

      /* 🔒 Prevent going back to signup */
      setTimeout(() => {
        router.replace("/SignIn");
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
    router.replace("/SignIn");
  };

  return (
    <>
      <div className="modern-form-wrapper">
        <div className="modern-form-card">
          <h1 className="modern-form-title">Sign Up Form</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            {errorMsg && (
              <div
                style={{
                  color: "#ef4444",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {errorMsg}
              </div>
            )}

            <PersonalInformation register={register} errors={errors} />
            <LocationDetails register={register} errors={errors} />
            <Security register={register} errors={errors} />
            <TermsConditions register={register} errors={errors} />

            <button
              className="modern-submit-btn"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </button>

            <div style={{ marginTop: "1.5rem", textAlign: "center", color: "#64748b" }}>
              Already have an account?{" "}
              <Link href="/SignIn" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <>
          <div
            className="success-overlay"
            onClick={closeSuccessMessage}
          />
          <div className="success-message">
            <div className="success-icon">
              <svg viewBox="0 0 52 52">
                <path
                  className="success-checkmark"
                  d="M14 27l8 8 16-16"
                />
              </svg>
            </div>
            <h2 className="success-title">
              Registration Successful!
            </h2>
            <p className="success-description">
              Your account has been created successfully. Welcome aboard!
            </p>
            <button
              className="success-close-btn"
              onClick={closeSuccessMessage}
            >
              Got it!
            </button>
          </div>
        </>
      )}
    </>
  );
}
