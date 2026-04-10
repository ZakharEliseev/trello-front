import { Button, Tooltip } from "antd";
import { FormProvider } from "react-hook-form";

import { Controlled } from "@/shared/ui/Controlled";
import { AppstoreAddOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../../../store/hooks";
import { useCreateCard } from "../../../../TaskCard/hooks/useCreateCard";

import cls from "./index.module.scss";

interface Props {
  isAuthor: boolean;
  boardId: number;
}

const CreateCard = ({ isAuthor, boardId }: Props) => {
  const { methods, onSubmit } = useCreateCard({ isAuthor, boardId });
  const currentUser = useAppSelector((state) => state.profile.profile);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={cls.createCard}>
        <Controlled.Input
          name="title"
          type="text"
          placeholder="Создать карточку"
          suffix={<AppstoreAddOutlined />}
          inputClassName={cls.input}
        />
        <Tooltip
          title={currentUser ? "" : "Войдите, чтобы создавать свои доски"}
          placement="bottom"
        >
          <Button className={cls.btn} htmlType="submit" variant="solid">
            Создать карточку
          </Button>
        </Tooltip>
      </form>
    </FormProvider>
  );
};

export default CreateCard;
