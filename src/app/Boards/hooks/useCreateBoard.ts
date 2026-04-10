import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";

import { RoutePath } from "../../../routes/config";
import { useAppSelector } from "../../store/hooks";
import { boardsApi } from "../api";
import { createBoardSchema } from "../models/constants";

type CreateBoardInputValue = {
  title: string;
};

export const useCreateBoard = () => {
  const methods = useForm<CreateBoardInputValue>({
    resolver: yupResolver(createBoardSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.profile.profile);

  const [createBoard] = boardsApi.useCreateBoardMutation();
  const onSubmit = methods.handleSubmit(
    async (inputValue: CreateBoardInputValue) => {
      if (!currentUser) return;
      const data = {
        title: inputValue.title,
        author_id: currentUser.id,
      };

      const response = await createBoard(data).unwrap();
      methods.reset();
      navigate(RoutePath.board(`${response.id}`));
    },
  );

  return {
    methods,
    onSubmit,
  };
};
