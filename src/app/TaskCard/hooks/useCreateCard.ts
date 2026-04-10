import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { cardsApi } from "../api";
import { createCardSchema } from "../models/constants";

type CreateCardInputValue = {
  title: string;
};

interface Props {
  isAuthor: boolean;
  boardId: number;
}

export const useCreateCard = ({ isAuthor, boardId }: Props) => {
  const methods = useForm<CreateCardInputValue>({
    resolver: yupResolver(createCardSchema),
    mode: "onSubmit",
  });

  const [createTaskCard] = cardsApi.useCreateTaskCardMutation();

  const onSubmit = methods.handleSubmit(
    async (inputValue: CreateCardInputValue) => {
      if (!isAuthor) return;
      const apiData = {
        title: inputValue.title,
        board_id: boardId,
        table_id: 1,
        position: 1,
      };
      await createTaskCard(apiData);
      methods.reset();
    },
  );

  return {
    methods,
    onSubmit,
  };
};
