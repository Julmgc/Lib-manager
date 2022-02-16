import * as yup from 'yup';
import STATE from '../utils/statesList';

const userSchema = yup.object().shape({
	isAdm: yup.boolean().default(false),
	name: yup.string().required().max(50),
	email: yup.string().required().max(150).email(),
	password: yup
		.string()
		.required(),
	createdAt: yup
		.date()
		.default(() => new Date())
		.transform(() => new Date()),
	updatedAt: yup
		.date()
		.default(() => new Date())
		.transform(() => new Date()),
	address: yup.object().shape({
		cep: yup
			.string()
			.required()
			.max(9, "Invalid CEP")
			.min(9, "Format Should be 'xxxxx-xxx'"),
		city: yup.string().required(),
		number: yup.string().max(5).required(),
		state: yup
			.string()
			.required()
			.transform((value: string): string => value.toUpperCase())
			.max(2)
			.oneOf(STATE, "Invalid State, State format 'XX'"),
		district: yup.string().required(),
	}),
});

export default userSchema;