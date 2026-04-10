import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { message } from "antd";

import { cardsApi } from "../api";

interface Props {
  id: number;
  setValue: Dispatch<SetStateAction<string>>;
}

export const useHandleChange = ({ id, setValue }: Props) => {
  const [updateTaskCard] = cardsApi.useUpdateTaskCardMutation();

  const autoResize = (element: HTMLTextAreaElement) => {
    const el = element;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleSave = async (field: "title" | "description", value: string) => {
    try {
      await updateTaskCard({ id, [field]: value }).unwrap();
      message.success("Сохранено");
      return true;
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.data?.title || "Ошибка при сохранении";
      message.error(errorMessage);
      return false;
    }
  };

  const handleChange = (
    field: "title" | "description",
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const element = event.target;
    const value = element.value;

    const limit = field === "title" ? 200 : 400;
    const errorMessage =
      limit === 200
        ? "Название карточки не может превышать 200 символов."
        : "Описание карточки не может превышать 400 символов.";
    autoResize(element);
    if (value.length > limit) {
      message.warning(
        `${errorMessage} Осталось символов ${limit - value.length}`,
      );
      setValue(value);
    } else {
      setValue(value);
    }
  };

  return { autoResize, handleSave, handleChange };
};
