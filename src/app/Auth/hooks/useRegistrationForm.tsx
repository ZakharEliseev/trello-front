import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";

import { RoutePath } from "../../../routes/config";
import { authApi } from "../api/auth";
import { registrationSchema } from "../models/constants";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const defaultValues = {
  name: "Alice",
  email: "alice@example.com",
  password: "securepass123",
};

export const useRegistrationForm = () => {
  const methods = useForm<RegistrationFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(registrationSchema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [registration] = authApi.useRegistrationMutation();

  const onSubmit = methods.handleSubmit(
    async (authData: RegistrationFormValues) => {
      await registration(authData).unwrap();
      navigate(RoutePath.login());
    },
  );

  return {
    onSubmit,
    methods,
  };
};
