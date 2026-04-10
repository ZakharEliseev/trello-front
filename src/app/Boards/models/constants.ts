import * as yup from "yup";

export const createBoardSchema = yup.object({
  title: yup
    .string()
    .min(1)
    .max(20, "Название карты должно состоять не более чем из 20 символов")
    .required("Введите название"),
});

export const SearchBoardSchema = yup.object({
  shareHash: yup.string().min(32).max(32).required("Введите публичную ссылку"),
});
