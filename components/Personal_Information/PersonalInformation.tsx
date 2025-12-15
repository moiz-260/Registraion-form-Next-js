import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "@/components/Form_Input/FormInput";
import { FormSelect } from "@/components/Form_Select/FormSelect";
import type { FormData } from "@/components/types/form.type";

interface PersonalInformationProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export function PersonalInformation({
  register,
  errors,
}: PersonalInformationProps) {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <div className="modern-section-header">
        <span className="modern-section-badge">1</span>
        Personal Information
      </div>

      <div className="modern-form-grid">
        <div className="modern-input-wrapper">
          <FormInput
            name="fullName"
            register={register}
            error={errors.fullName}
            placeholder="Full Name"
            className="modern-input"
          />
        </div>

        <div className="modern-input-wrapper">
          <FormInput
            name="email"
            register={register}
            error={errors.email}
            placeholder="Email"
            className="modern-input"
          />
        </div>

        <div className="modern-input-wrapper">
          <FormInput
            name="phone"
            register={register}
            error={errors.phone}
            placeholder="Phone"
            className="modern-input"
          />
        </div>

        <div className="modern-input-wrapper">
          <FormInput
            name="dateofbirth"
            register={register}
            error={errors.dateofbirth}
            type="date"
            className="modern-input"
            placeholder="DateOfBirth"
          />
        </div>

        {/* <div className="modern-input-wrapper">
          <FormInput
            name="age"
            register={register}
            error={errors.age}
            placeholder="Age"
            type="number"
            className="modern-input"
          />
        </div> */}

        <div className="modern-input-wrapper">
          <FormSelect
            name="gender"
            register={register}
            error={errors.gender}
            options={genderOptions}
            placeholder="Select gender"
            className="modern-select"
          />
        </div>
      </div>
    </>
  );
}
