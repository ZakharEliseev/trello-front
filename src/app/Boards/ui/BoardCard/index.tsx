import { useState } from "react";

import { Tooltip } from "antd";
import { useNavigate } from "react-router";

import { DeleteBoardBtn } from "@/app/Boards/ui/DeleteBoardBtn";
import { RoutePath } from "@/routes/config";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useAppSelector } from "../../../store/hooks";
import { TextArea } from "../TextArea";

import cls from "./index.module.scss";

interface Props {
  title: string;
  boardId: number;
  author_id: number;
}

const BoardCard = ({ title, boardId, author_id }: Props) => {
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.profile.profile);
  const isAuthor = currentUser?.id === author_id;
  const id = currentUser?.id;
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: boardId,
    disabled: isInputFocused || !isAuthor,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cls.boardCardWrapper}
    >
      <div
        className={cls.boardCard}
        onClick={() => navigate(RoutePath.board(`${boardId}`))}
      />
      <div className={cls.title}>
        {author_id === id ? (
          <Tooltip title="Нажмите для редактирования" placement="bottom">
            {isEditingTitle ? (
              <TextArea
                boardId={boardId}
                tempTitle={tempTitle}
                setTempTitle={setTempTitle}
                setIsEditingTitle={setIsEditingTitle}
                setIsInputFocused={setIsInputFocused}
              />
            ) : (
              <div
                className={cls.titleText}
                onClick={() => setIsEditingTitle((prev) => !prev)}
              >
                {tempTitle}
              </div>
            )}
          </Tooltip>
        ) : (
          <div className={cls.titleText}>{title}</div>
        )}
        {author_id === id ? (
          <DeleteBoardBtn className={cls.deleteBoard} boardId={boardId} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BoardCard;
