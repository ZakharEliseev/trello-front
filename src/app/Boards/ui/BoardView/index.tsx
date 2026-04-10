import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { Tooltip } from "antd";

import { Navbar } from "@/shared/ui";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskCard from "../../../TaskCard";
import { tableConfig } from "../../../TaskCard/models/constants";
import { useDragEnd } from "../../hooks/useCardDragEnd";
import { Board } from "../../models/types";
import BoardColumn from "../BoardColumn";
import BoardHeader from "../BoardHeader";
import { DeleteBoardBtn } from "../DeleteBoardBtn";

import cls from "./index.module.scss";

interface Props extends Board {
  isAuthor: boolean;
  redirect: boolean;
}

const BoardView = ({
  id,
  title,
  share_hash,
  author_id,
  isAuthor,
  cards,
}: Props) => {
  useEffect(() => {
    setItems(cards);
  }, [cards]);

  const [items, setItems] = useState(cards);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [animation, setAnimation] = useState<boolean>(true);

  const { handleDragEnd, sensors } = useDragEnd({ items, setItems });

  return (
    <div className={cls.main}>
      <Navbar />
      <BoardHeader
        title={title}
        boardId={id}
        shareHash={share_hash}
        author_id={author_id}
      />
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={(event) => {
          setActiveId(Number(event.active.id));
          setAnimation(false);
        }}
        onDragEnd={(event) => {
          setActiveId(null);
          handleDragEnd(event);
          setAnimation(true);
        }}
        sensors={sensors}
      >
        <div className={cls.tables}>
          {tableConfig.map((table) => {
            const cardsForColumn = items
              ?.filter((item) => item.table_id === table.table_id)
              .sort((a, b) => a.position - b.position);
            const itemForSortable = cardsForColumn?.map((item) => item.id);

            return (
              <BoardColumn
                key={table.table_id}
                tableId={table.table_id}
                title={table.title}
              >
                <SortableContext
                  items={itemForSortable!}
                  strategy={verticalListSortingStrategy}
                >
                  <AnimatePresence>
                    {cardsForColumn?.map((card) => (
                      <motion.div
                        key={card.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: animation ? 0 : undefined }}
                        transition={{ duration: 0.3 }}
                      >
                        <TaskCard
                          key={card.id}
                          title={card.title}
                          id={card.id}
                          board_id={card.board_id}
                          description={card.description}
                          table_id={card.table_id}
                          position={card.position}
                          isAuthor={isAuthor}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </SortableContext>
              </BoardColumn>
            );
          })}
        </div>
        <DragOverlay>
          {activeId ? (
            <TaskCard {...items?.find((i) => i.id === activeId)!} isOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>

      {isAuthor ? (
        <Tooltip title="Удалить доску">
          <div className={cls.deleteBoardWrapper}>
            <DeleteBoardBtn boardId={id} className={cls.deleteBoard} redirect />
          </div>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

export default BoardView;
