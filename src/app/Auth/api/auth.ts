import { apiService } from "@/shared/services/HttpService";

import {
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
} from "../models/types";

export const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (authData) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: authData,
      }),
    }),
    googleLogin: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      query: (data) => ({
        url: "/auth/google-auth",
        method: "POST",
        body: { idToken: data.idToken },
      }),
    }),
    registration: builder.mutation<void, RegistrationRequest>({
      query: (authData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: authData,
      }),
    }),
  }),
});
