import * as yup from "yup";

export const createCardSchema = yup.object({
  title: yup
    .string()
    .min(1)
    .max(20, "Название доски должно не состоять более чем из 20 символов")
    .required("Введите название"),
});

export const tableConfig = [
  { table_id: 1, title: "Создано" },
  { table_id: 2, title: "В процессе" },
  { table_id: 3, title: "Завершено" },
];

export const overlayStyle = {
  transform: "rotate(4deg) scale(1.05)",
  transition: "transform 0.2s ease",
  cursor: "grabbing",
};
