import * as yup from "yup";

export const formSchema = yup.object().shape({
  fullName: yup.string().trim().required("Full name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .trim()
    .required("Phone is required")
    .min(11, "Min 11 numbers")
    .min(11, "Min 11 numbers")
    .max(11, "Max 11 numbers"),

  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),

  dateofbirth: yup.string().required("Date of Birth is required"),

  gender: yup.string().trim(),

  country: yup
    .string()
    .trim()
    .required("Country required")
    .matches(/^[A-Za-z\s]+$/, "Country must contain only letters"),

  city: yup
    .string()
    .trim()
    .required("City required")
    .matches(/^[A-Za-z\s]+$/, "City must contain only letters"),

  address: yup
    .string()
    .trim()
    .required("Address required")
    .min(5, "Address is too short"),

  password: yup
    .string()
    .min(6, "Min 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain upper, lower, number & special character"
    )
    .required("Password required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password required"),

  termsAccepted: yup
    .boolean()
    .required("You must accept the terms")
    .oneOf([true], "You must accept the terms"),
});

export type FormSchema = yup.InferType<typeof formSchema>;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;
