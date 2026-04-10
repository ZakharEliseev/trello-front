import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";

import { RoutePath } from "../../../routes/config";
import { userApi } from "../../Profile/api";
import { useAppDispatch } from "../../store/hooks";
import { setUserProfileData } from "../../store/profileSlice";
import { authApi } from "../api/auth";
import { loginSchema } from "../models/constants";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const defaultValues = {
  email: "ivan@example.com",
  password: "securepass123",
  rememberMe: false,
};

export const useLoginForm = () => {
  const methods = useForm<LoginFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [login] = authApi.useLoginMutation();
  const [getProfile] = userApi.useLazyGetProfileQuery();

  const dispatch = useAppDispatch();

  const onSubmit = methods.handleSubmit(async (authData: LoginFormValues) => {
    const apiData = {
      email: authData.email,
      password: authData.password,
    };

    const response = await login(apiData).unwrap();
    const storage = authData.rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", response.token);

    const { data: profileData } = await getProfile();
    if (profileData) {
      dispatch(setUserProfileData(profileData));
    }

    navigate(RoutePath.boards());
  });

  return {
    onSubmit,
    methods,
  };
};
