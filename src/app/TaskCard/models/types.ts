import TaskCard from "..";

export interface CreateTaskCardRequest {
  title: string;
  description?: string;
  board_id: number;
  table_id?: number;
  position?: number;
}

export interface TaskCard {
  id: number;
  title: string;
  description: string | null;
  board_id: number;
  table_id: number;
  position: number;
}

export type TaskCardList = TaskCard[];

export interface UpdateTaskCard {
  id: number;
  title?: string;
  description?: string | null;
  table_id?: number;
  position?: number;
  board_id?: number;
}

export interface DeleteTaskCardRequest {
  id: number;
}
