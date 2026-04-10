import * as yup from "yup";

import apple from "~/icons/apple.svg";
import microsoft from "~/icons/microsoft.svg";
import slack from "~/icons/slack.svg";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Некорректный формат email")
    .min(6, "Email должен состоять минимум из 6 символов")
    .required("Email обязателен"),
  rememberMe: yup.boolean().oneOf([true, false]).default(false),
  password: yup
    .string()
    .min(6, "Пароль должен состоять из минимум 6 уникальных символов")
    .required("Пароль обзяателен"),
});

export const registrationSchema = yup.object({
  name: yup
    .string()
    .min(5, "Имя должно состоять минимум из 6 символов")
    .max(10, "Имя должно состоять максимум из 10 символов")
    .required("Имя обязательно"),
  email: yup
    .string()
    .email("Некорректный формат email")
    .min(6, "Email должен состоять минимум из 6 символов")
    .required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен состоять из минимум 6 уникальных символов")
    .required("Пароль обзяателен"),
});

export const SOCIAL_PROVIDERS = [
  {
    id: "microsoft",
    src: microsoft,
    alt: "Microsoft Auth",
    label: "Microsoft",
  },
  { id: "apple", src: apple, alt: "Apple Auth", label: "Apple" },
  { id: "slack", src: slack, alt: "Slack Auth", label: "Slack" },
] as const;
