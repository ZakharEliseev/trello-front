import { apiService } from "../../../shared/services/HttpService";
import {
  Board,
  CreateBoardRequest,
  CreateBoardResponse,
  DeleteBoardResponse,
  GetBoardByHashRequest,
  GetBoardByIDRequest,
  GetBoardsListResponse,
  GetBoardsRequest,
  OrderBoardsList,
  RenameBoardResponse,
  ShareLinkResponse,
} from "../models/types";

export const boardsApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<GetBoardsListResponse, GetBoardsRequest>({
      query: (params) => ({
        url: "/boards",
        method: "GET",
        params: { author_id: params.author_id },
      }),
      providesTags: ["Boards"],
    }),
    getBoardById: builder.query<Board, GetBoardByIDRequest>({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "Boards", id },
        { type: "Cards", id },
      ],
    }),
    getBoardByHash: builder.query<Board, GetBoardByHashRequest>({
      query: ({ shareHash }) => ({
        url: `/boards/shared/${shareHash}`,
        method: "GET",
      }),
      providesTags: (result, error, { shareHash }) => [
        { type: "BoardHash", id: shareHash },
      ],
    }),
    createBoard: builder.mutation<CreateBoardResponse, CreateBoardRequest>({
      query: (body) => ({
        url: "/boards",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Boards"],
    }),
    deleteBoard: builder.mutation<void, DeleteBoardResponse>({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards"],
    }),
    renameBoard: builder.mutation<void, RenameBoardResponse>({
      query: ({ id, title }) => ({
        url: `/boards/${id}/title`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Boards", id }],
    }),
    shareLink: builder.mutation<Board, ShareLinkResponse>({
      query: ({ id, shareHash }) => ({
        url: `/boards/${id}/share-link`,
        method: "PATCH",
        body: { shareHash },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Boards", id }],
    }),
    orderBoards: builder.mutation<void, OrderBoardsList>({
      query: (payload) => ({
        url: `/boards/reorder`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Boards"],
    }),
  }),
});
