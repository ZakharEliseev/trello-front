import { useState } from "react";

import { clsx } from "clsx";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { overlayStyle } from "./models/constants";
import { TaskCard as TaskCardProps } from "./models/types";
import { DeleteTaskCardBtn } from "./ui/DeleteTaskCardBtn";
import { TextArea } from "./ui/TextArea";

import cls from "./index.module.scss";

interface Props extends TaskCardProps {
  isOverlay?: boolean;
  isAuthor?: boolean;
}

const TaskCard = ({
  title,
  id,
  description,
  isOverlay,
  isAuthor,
  table_id,
}: Props) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingDescr, setIsEditingDescr] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(title);
  const [tempDescr, setTempDescr] = useState<string>(description || "");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const isComplete = table_id === 3;
  const canEdit = isAuthor && !isComplete;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: isOverlay || isInputFocused || !isAuthor,
  });

  const style =
    transform && !isOverlay
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
        }
      : undefined;

  return (
    <div
      className={clsx(
        cls.card,
        isOverlay && cls.cardOverlay,
        isDragging && isAuthor && cls.cardDragging,
        isComplete && cls.completeTask,
      )}
      ref={setNodeRef}
      style={isOverlay ? overlayStyle : style}
      {...listeners}
      {...attributes}
    >
      <div className={cls.titleContainer}>
        {isEditingTitle && canEdit ? (
          <TextArea
            id={id}
            field="title"
            value={tempTitle}
            setValue={setTempTitle}
            setIsEditing={setIsEditingTitle}
            setIsInputFocused={setIsInputFocused}
          />
        ) : (
          <div
            className={cls.title}
            onClick={() => setIsEditingTitle((prev) => !prev)}
          >
            {tempTitle}
          </div>
        )}
        {isAuthor && <DeleteTaskCardBtn className={cls.deleteCard} id={id} />}
      </div>

      <div className={cls.descriptionContainer}>
        {isEditingDescr && canEdit ? (
          <TextArea
            id={id}
            field="description"
            value={tempDescr}
            setValue={setTempDescr}
            setIsEditing={setIsEditingDescr}
            setIsInputFocused={setIsInputFocused}
          />
        ) : (
          <div
            className={cls.description}
            onClick={() => setIsEditingDescr((prev) => !prev)}
          >
            {tempDescr}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;


