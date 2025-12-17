import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "@/components/Form_Input/FormInput";
import type { FormData } from "@/components/types/form.type";

interface SecurityProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function Security({
  register,
  errors,
}: SecurityProps) {
  return (
    <>
      <div className="modern-section-header">
        <span className="modern-section-badge">3</span>
        Security
      </div>

      <div className="modern-form-grid">
        <div className="modern-input-wrapper">
          <FormInput
            name="password"
            register={register}
            error={errors.password}
            placeholder="Password"
            type="password"
            className="modern-input"
            autoComplete="new-password"
          />
        </div>

        <div className="modern-input-wrapper">
          <FormInput
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
            type="password"
            className="modern-input"
            autoComplete="new-password"
          />
        </div>
      </div>
    </>
  );
}
