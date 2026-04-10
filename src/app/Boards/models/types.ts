import { TaskCardList } from "../../TaskCard/models/types";

export interface GetBoardsRequest {
  author_id: number;
}

export interface GetBoardByIDRequest {
  id: string | number;
}

export interface GetBoardByHashRequest {
  shareHash: string;
}

export interface Board {
  id: number;
  title: string;
  author_id: number;
  share_hash: string | null;
  order: number;
  cards?: TaskCardList;
}

export type GetBoardsListResponse = Board[];

export interface CreateBoardRequest {
  title: string;
  author_id: number;
}

export interface CreateBoardResponse {
  title: string;
  author_id: number;
  share_hash: null;
  id: number;
}

export interface DeleteBoardResponse {
  id: number;
}

export interface RenameBoardResponse {
  title: string;
  id: number;
}

export interface ShareLinkResponse {
  id: number;
  shareHash: string | null;
}

export interface OrderBoards {
  id: number;
  order: number;
}

export type OrderBoardsList = OrderBoards[];
