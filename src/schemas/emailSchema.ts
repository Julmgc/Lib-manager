import * as yup from "yup";

const emailSchema = yup.object().shape({
  email: yup.string().required().email().transform((email) => email.toLowerCase()),
  message: yup.string().required()
});

export default emailSchema;
