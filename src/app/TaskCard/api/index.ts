import { apiService } from "@/shared/services/HttpService";

import {
  CreateTaskCardRequest,
  DeleteTaskCardRequest,
  TaskCard,
  UpdateTaskCard,
} from "../models/types";

export const cardsApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createTaskCard: builder.mutation<TaskCard, CreateTaskCardRequest>({
      query: (payload) => ({
        url: "/cards",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, payload) => [
        { type: "Cards", id: payload.board_id },
      ],
    }),
    deleteTaskCard: builder.mutation<void, DeleteTaskCardRequest>({
      query: (payload) => ({
        url: `/cards/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Cards"],
    }),
    updateTaskCard: builder.mutation<TaskCard, UpdateTaskCard>({
      query: ({ id, ...body }) => {
        return {
          url: `/cards/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Cards"],
    }),
  }),
});
