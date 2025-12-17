"use client";
import { useState } from "react";
import type { UseFormRegister, FieldError, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  register,
  error,
  placeholder,
  type = "text",
  className = "form-input",
  autoComplete,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField =
    type === "password" || name === "password" || name === "confirmPassword";

  const actualType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative w-full">
      {/* ✅ FIXED HEIGHT WRAPPER FOR INPUT + ICON */}
      <div className="relative h-[60px] flex items-center">
        <input
          id={name}
          className={`${className} ${isPasswordField ? "pr-10" : ""
            } h-full peer`}
          placeholder=" "
          type={actualType}
          autoComplete={autoComplete}
          {...register(name)}
        />

        {placeholder && (
          <label
            htmlFor={name}
            className="absolute left-4 top-1 -translate-y-1/2 px-2 border-none rounded-md
              text-sm font-medium text-slate-500 transition-all duration-200 pointer-events-none
              peer-focus:text-blue-500 peer-focus:font-semibold"
            style={{
              zIndex: 1,
              backdropFilter: "blur(5px)",
            }}
          >
            {placeholder}
          </label>
        )}

        {/* 👁 Password Eye Icon — locked to input height */}
        {isPasswordField && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 hover:text-blue-500 transition z-10"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </span>
        )}
      </div>

      {/* ❗ ERROR PLACED OUTSIDE — no layout shift */}
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

// Also export as default for flexibility
export default FormInput;
