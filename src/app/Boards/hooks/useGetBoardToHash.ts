import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";

import { RoutePath } from "../../../routes/config";
import { boardsApi } from "../api";
import { SearchBoardSchema } from "../models/constants";

type SearchBoardValue = {
  shareHash: string;
};

export const useGetBoardToHash = () => {
  const methods = useForm<SearchBoardValue>({
    resolver: yupResolver(SearchBoardSchema),
    mode: "onSubmit",
  });
  const navigate = useNavigate();

  const [getBoardByHash] = boardsApi.useLazyGetBoardByHashQuery();

  const onSubmit = methods.handleSubmit(
    async (searchValue: SearchBoardValue) => {
      const data = await getBoardByHash(searchValue).unwrap();
      navigate(RoutePath.board(String(data?.id)));
      methods.reset();
    },
  );

  return {
    methods,
    onSubmit,
  };
};
