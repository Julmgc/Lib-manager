import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  code: yup
    .string()
    .required()
    .transform((e: string) => e.toUpperCase())
    .length(6),
  email: yup.string().required().email(),
  newPassword: yup.string().required(),
  passwordCheck: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export default changePasswordSchema;
