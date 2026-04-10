import { Dispatch, SetStateAction } from "react";

import { useHandleChange } from "@/app/Boards/hooks/useHandleChange";

import cls from "./index.module.scss";

interface Props {
  boardId: number;
  tempTitle: string;
  setTempTitle: Dispatch<SetStateAction<string>>;
  setIsEditingTitle: Dispatch<SetStateAction<boolean>>;
  setIsInputFocused?: Dispatch<SetStateAction<boolean>>;
}

export const TextArea = ({
  boardId,
  setTempTitle,
  tempTitle,
  setIsEditingTitle,
  setIsInputFocused,
}: Props) => {
  const { handleChange, handleSave, autoResize } = useHandleChange({
    boardId,
    setTempTitle,
  });

  return (
    <textarea
      name="title"
      className={cls.inputTitle}
      value={tempTitle}
      onChange={(event) => {
        handleChange(event, "width");
      }}
      onBlur={async () => {
        setIsInputFocused?.(false);
        const isSuccess = await handleSave(tempTitle);
        isSuccess && setIsEditingTitle((prev) => !prev);
      }}
      onFocus={(event) => {
        setIsInputFocused?.(true);
        autoResize(event.target, "width");
        event.target.select();
      }}
      autoFocus
    ></textarea>
  );
};
