import { Spin } from "antd";
import { useParams } from "react-router";

import NotFound from "../../../NotFound";
import { useAppSelector } from "../../../store/hooks";
import { boardsApi } from "../../api";
import BoardView from "../../ui/BoardView";

const SharedBoardPage = () => {
  const { shareHash } = useParams();
  const currentUser = useAppSelector((state) => state.profile.profile);

  if (!shareHash) return <Spin description="Ищем доску" size="large" />;
  const { data, isLoading, error } = boardsApi.useGetBoardByHashQuery({
    shareHash,
  });

  if (isLoading) return <Spin description="Загрузка" size="large" />;
  if (error || !data) return <NotFound />;

  return (
    <div>
      <BoardView {...data} isAuthor={currentUser ? true : false} redirect />
    </div>
  );
};

export default SharedBoardPage;
