import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { message } from "antd";

import { boardsApi } from "../api";

interface Props {
  boardId: number;
  setTempTitle: Dispatch<SetStateAction<string>>;
}

export const useHandleChange = ({ boardId, setTempTitle }: Props) => {
  const [renameBoard] = boardsApi.useRenameBoardMutation();

  const autoResize = (
    element: HTMLTextAreaElement,
    dimension: "width" | "height",
  ) => {
    const el = element;
    if (dimension === "height") {
      el.style.height = "auto";
      el.style.height = `${element.scrollHeight}px`;
    } else {
      el.style.height = "auto";
      el.style.height = `${element.scrollHeight}px`;

      el.style.width = "auto";
      const originalWrap = element.style.whiteSpace;
      el.style.whiteSpace = "nowrap";
      el.style.width = `${element.scrollWidth}px`;
      el.style.whiteSpace = originalWrap;
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    dimension: "width" | "height",
  ) => {
    const element = event.target;
    const value = element.value;

    const limit = 200;
    const errorMessage = "Название доски не может превышать 200 символов.";

    autoResize(element, dimension);
    if (value.length > limit) {
      message.warning(
        `${errorMessage} Осталось символов ${limit - value.length}`,
      );
      setTempTitle(value);
    } else {
      setTempTitle(value);
    }
  };

  const handleSave = async (value: string) => {
    try {
      await renameBoard({ id: boardId, title: value }).unwrap();
      message.success("Сохранено");
      return true;
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.data?.title || "Ошибка при сохранении";
      message.error(errorMessage);
      return false;
    }
  };

  return { handleChange, handleSave, autoResize };
};
