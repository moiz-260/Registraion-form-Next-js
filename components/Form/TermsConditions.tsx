import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormCheckbox } from "@/components/Checkbox/FormCheckbox";
import type { FormData } from "@/types/form.type";

interface TermsConditionsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function TermsConditions({
  register,
  errors,
}: TermsConditionsProps) {
  return (
    <div className="modern-terms">
      <FormCheckbox
        name="termsAccepted"
        register={register}
        error={errors.termsAccepted}
        label="I accept the terms and conditions"
        className="modern-checkbox"
      />
    </div>
  );
}
