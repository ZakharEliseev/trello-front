import { Spin } from "antd";
import { useParams } from "react-router";

import NotFound from "../../../NotFound";
import { boardsApi } from "../../api";
import BoardView from "../../ui/BoardView";

const BoardByID = () => {
  const { id } = useParams();
  if (!id) return <Spin description="Ищем доску" size="large" />;

  const { data, isLoading, error } = boardsApi.useGetBoardByIdQuery({ id });
  if (isLoading) return <Spin description="Загрузка!!!!!!!" size="large" />;
  if (error || !data) return <NotFound />;

  return (
    <div>
      <BoardView {...data} isAuthor redirect={false} />
    </div>
  );
};

export default BoardByID;
