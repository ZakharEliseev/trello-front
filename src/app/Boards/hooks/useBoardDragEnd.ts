// hooks/useBoardDragEnd.ts
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { boardsApi } from "../api";
import { GetBoardsListResponse } from "../models/types";

export const useBoardDragEnd = (
  boards: GetBoardsListResponse | undefined,
  setBoards: React.Dispatch<
    React.SetStateAction<GetBoardsListResponse | undefined>
  >,
) => {
  const [orderBoards] = boardsApi.useOrderBoardsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !boards) return;

    const oldIndex = boards.findIndex((board) => board.id === active.id);
    const newIndex = boards.findIndex((board) => board.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newBoards = arrayMove(boards, oldIndex, newIndex);

    const updatedBoards: GetBoardsListResponse = newBoards.map(
      (board, index) => ({
        ...board,
        order: index,
      }),
    );

    setBoards(updatedBoards);

    const orderData = updatedBoards.map((board) => ({
      id: board.id,
      order: board.order,
    }));

    await orderBoards(orderData);
  };

  return { handleDragEnd, sensors };
};
