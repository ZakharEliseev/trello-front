import { useEffect, useState } from "react";

import { Divider } from "antd";

import { Navbar } from "@/shared/ui";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";

import { useAppSelector } from "../../../store/hooks";
import { boardsApi } from "../../api";
import { useBoardDragEnd } from "../../hooks/useBoardDragEnd";
import BoardCard from "../../ui/BoardCard";

import cls from "./index.module.scss";

const Boards = () => {
  const currentUser = useAppSelector((state) => state.profile.profile)!;

  const { data: boardsData } = boardsApi.useGetAllBoardsQuery({
    author_id: currentUser.id,
  });

  const [boards, setBoards] = useState(boardsData);
  const { handleDragEnd, sensors } = useBoardDragEnd(boards, setBoards);

  useEffect(() => {
    if (boardsData) {
      const sortedBoards = [...boardsData].sort((a, b) => a.order - b.order);
      setBoards(sortedBoards);
    }
  }, [boardsData]);

  const boardIds = boards?.map((board) => board.id) || [];

  return (
    <div className={cls.main}>
      <Navbar />
      <Divider className={cls.divider} />
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={boardIds} strategy={rectSwappingStrategy}>
          <div className={cls.boardsContainer}>
            <div className={cls.boards}>
              {boards?.map((board) => (
                <BoardCard
                  key={board.id}
                  title={board.title}
                  boardId={board.id}
                  author_id={board.author_id}
                />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Boards;
