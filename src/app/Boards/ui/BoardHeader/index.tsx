import { useState } from "react";

import { Tooltip } from "antd";

import { useAppSelector } from "../../../store/hooks";
import CreateCard from "../Forms/CreateCard";
import { TextArea } from "../TextArea";

import ShareLink from "./ui/ShareLink";

import cls from "./index.module.scss";

interface Props {
  title: string;
  boardId: number;
  shareHash: string | null;
  author_id: number | null;
}

const BoardHeader = ({ title, boardId, shareHash, author_id }: Props) => {
  const [tempTitle, setTempTitle] = useState<string>(title);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const currentUser = useAppSelector((state) => state.profile.profile);
  const isAuthor = currentUser?.id === author_id;

  return (
    <div className={cls.header}>
      <Tooltip
        title={
          isAuthor
            ? "Нажмите для редактирования"
            : "Редактирование доступно только автору"
        }
        placement="bottom"
      >
        {isEditingTitle && isAuthor ? (
          <TextArea
            boardId={boardId}
            tempTitle={tempTitle}
            setTempTitle={setTempTitle}
            setIsEditingTitle={setIsEditingTitle}
          />
        ) : (
          <div
            className={cls.title}
            onClick={() => setIsEditingTitle((prev) => !prev)}
          >
            {tempTitle}
          </div>
        )}
      </Tooltip>
      <CreateCard isAuthor={isAuthor} boardId={boardId} />
      {isAuthor ? <ShareLink boardId={boardId} shareHash={shareHash} /> : ""}
    </div>
  );
};

export default BoardHeader;
