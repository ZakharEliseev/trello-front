import { apiService } from "../../../shared/services/HttpService";
import { ProfileResponse } from "../models/types";

export const userApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});
