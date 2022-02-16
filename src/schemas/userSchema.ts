import * as yup from "yup";
import STATE from "../utils/statesList";

const userSchema = yup.object().shape({
  name: yup.string().required().max(50),
  email: yup.string().required().max(150).email(),
  password: yup.string().required(),
  authorized: yup
    .boolean()
    .default(true)
    .transform(() => true),
  isAdm: yup.boolean().default(false),
  address: yup.object().shape({
    street: yup.string().required(),
    streetNumber: yup.string().max(5).required(),
    city: yup.string().required(),
    cpf: yup.string().required().length(11),
    state: yup
      .string()
      .required()
      .transform((value: string): string => value.toUpperCase())
      .max(2)
      .oneOf(STATE, "Invalid State, State format 'XX'"),
    zipcode: yup
      .string()
      .required()
      .max(9, "Invalid CEP")
      .min(9, "Format Should be 'xxxxx-xxx'"),
    district: yup.string().required(),
  }),
});

export default userSchema;
