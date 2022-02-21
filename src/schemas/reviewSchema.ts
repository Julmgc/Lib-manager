import * as yup from "yup";

const reviewSchema = yup.object().shape({
  rating: yup.number().required().min(1).max(10),
  reviewContent: yup.string().required().max(150),
});

export default reviewSchema;
