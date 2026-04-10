import { Dispatch, SetStateAction } from "react";

import { useHandleChange } from "@/app/TaskCard/hooks/useHandleChange";

import cls from "./index.module.scss";

interface Props {
  id: number;
  field: "title" | "description";
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsInputFocused?: Dispatch<SetStateAction<boolean>>;
}

export const TextArea = ({
  value,
  field,
  setValue,
  id,
  setIsEditing,
  setIsInputFocused,
}: Props) => {
  const { handleChange, handleSave, autoResize } = useHandleChange({
    id,
    setValue,
  });

  return (
    <textarea
      name="title"
      className={cls.inputTitle}
      value={value}
      onChange={(event) => {
        handleChange(field, event);
      }}
      onBlur={async () => {
        setIsInputFocused?.(false);
        const isSuccess = await handleSave(field, value);
        isSuccess && setIsEditing((prev) => !prev);
      }}
      onFocus={(event) => {
        setIsInputFocused?.(true);
        autoResize(event.target);
        event.target.select();
      }}
      autoFocus
    ></textarea>
  );
};
