import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "@/components/Form_Input/FormInput";
import type { FormData } from "@/components/types/form.type";

interface LocationDetailsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function LocationDetails({
  register,
  errors,
}: LocationDetailsProps) {
  return (
    <>
      <div className="modern-section-header">
        <span className="modern-section-badge">2</span>
        Location Details
      </div>

      <div className="modern-form-grid">
        <div className="modern-input-wrapper">
          <FormInput
            name="country"
            register={register}
            error={errors.country}
            placeholder="Country"
            className="modern-input"
          />
        </div>

        <div className="modern-input-wrapper">
          <FormInput
            name="city"
            register={register}
            error={errors.city}
            placeholder="City"
            className="modern-input"
          />
        </div>
      </div>

      <div className="modern-form-grid full-width">
        <div className="modern-input-wrapper">
          <FormInput
            name="address"
            register={register}
            error={errors.address}
            placeholder="Address"
            className="modern-input"
          />
        </div>
      </div>
    </>
  );
}
