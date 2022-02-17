import * as yup from "yup";

const bookSchema = yup.object().shape({
  name: yup.string().required(),
  author: yup.string().required(),
  pages: yup.number().required(),
  genreCdd: yup.number().required(),
});

export default bookSchema;
