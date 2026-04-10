import clsx from "clsx";
import { useNavigate } from "react-router";

import { boardsApi } from "@/app/Boards/api";
import { RoutePath } from "@/routes/config";
import { DeleteOutlined } from "@ant-design/icons";

export interface Props {
  boardId: number;
  className?: string;
  redirect?: boolean;
}

export const DeleteBoardBtn = ({ boardId, className, redirect }: Props) => {
  const navigate = useNavigate();
  const [deleteBoard] = boardsApi.useDeleteBoardMutation();

  const handleClick = async (boardId: number) => {
    if (redirect) {
      navigate(RoutePath.boards(), { replace: true });
    }
    await deleteBoard({ id: boardId });
  };

  return (
    <DeleteOutlined
      className={clsx(className)}
      onClick={async () => handleClick(boardId)}
    />
  );
};
