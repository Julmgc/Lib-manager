import * as yup from "yup";
import STATE from "../utils/statesList";

const capitalize = (str: string) => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word: string) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

export const userSchema = yup.object().shape({
  name: yup.string().required().max(50).transform((name)=> capitalize(name)),
  email: yup.string().required().max(150).email().transform((email => email.toLowerCase())),
  password: yup.string().required(),
  cpf: yup.string().required().length(11),
  authorized: yup
    .boolean()
    .default(true),
  isAdm: yup.boolean().default(false),
  address: yup.object().shape({
    street: yup.string().required(),
    streetNumber: yup.string().max(5).required(),
    city: yup.string().required(),

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

export const updateUserSchema = yup.object().shape({
	name: yup
		.string()
		.max(50)
		.transform((name) => capitalize(name)),
	email: yup
		.string()
		.max(150)
		.email()
		.transform((email) => email.toLowerCase()),
	password: yup.string(),
	address: yup.object().shape({
		street: yup.string(),
		streetNumber: yup.string().max(5),
		city: yup.string(),
		state: yup
			.string()
			.transform((value: string): string => value.toUpperCase())
			.max(2)
			.oneOf(STATE, "Invalid State, State format 'XX'"),
		zipcode: yup
			.string()
			.max(9, "Invalid CEP")
			.min(9, "Format Should be 'xxxxx-xxx'"),
		district: yup.string(),
	}),
});
