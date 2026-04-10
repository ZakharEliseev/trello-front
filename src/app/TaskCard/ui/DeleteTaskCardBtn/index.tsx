import clsx from "clsx";

import { DeleteOutlined } from "@ant-design/icons";

import { cardsApi } from "../../api";

export interface Props {
  id: number;
  className?: string;
}

export const DeleteTaskCardBtn = ({ id, className }: Props) => {
  const [deleteTaskCard] = cardsApi.useDeleteTaskCardMutation();

  const handleClick = async (id: number) => {
    await deleteTaskCard({ id: id });
  };

  return (
    <DeleteOutlined
      className={clsx(className)}
      onClick={async () => handleClick(id)}
    />
  );
};
