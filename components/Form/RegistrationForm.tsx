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
import "@/components/Form/RegistrationForm.css";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(formSchema) as any,
  });

  const [savedFormData, setSavedFormData, clearFormData] =
    useLocalStorage<FormData>({
      key: "formData",
      initialValue: defaultFormValues,
    });

  useEffect(() => {
    if (savedFormData && Object.keys(savedFormData).length > 0) {
      reset(savedFormData);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      setSavedFormData(value as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSavedFormData]);

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    setShowSuccess(true);
    clearFormData();
    reset(defaultFormValues);
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <div className="modern-form-wrapper">
        <div className="modern-form-card">
          <h1 className="modern-form-title">Registration Form</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
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
            <h2 className="success-title">Registration Successful!</h2>
            <p className="success-description">
              Your account has been created successfully. Welcome aboard!
            </p>
            <button className="success-close-btn" onClick={closeSuccessMessage}>
              Got it!
            </button>
          </div>
        </>
      )}
    </>
  );
}
