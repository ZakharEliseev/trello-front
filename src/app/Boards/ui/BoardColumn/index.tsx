import { useDroppable } from "@dnd-kit/core";

import cls from "./index.module.scss";

interface BoardColumnProps {
  tableId: number;
  title: string;
  children: React.ReactNode;
}

const BoardColumn = ({ tableId, title, children }: BoardColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: tableId.toString(),
  });

  return (
    <div ref={setNodeRef} className={cls.board}>
      <p className={cls.tableTitle}>{title}</p>
      {children}
    </div>
  );
};

export default BoardColumn;
