import * as yup from "yup";

export const nicknameSchema = yup.string().required().min(6);

export const emailSchema = yup.string().required().email();

export const passwordSchema = yup
  .string()
  .required()
  .min(8)
  .matches(/[a-z]/)
  .matches(/[A-Z]/)
  .matches(/\d/)
  .matches(/[\W_]/);

export const otpSchema = yup.string().required().min(6);
