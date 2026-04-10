import { Button, Tooltip } from "antd";
import { FormProvider } from "react-hook-form";

import { useCreateBoard } from "@/app/Boards/hooks/useCreateBoard";
import { Controlled } from "@/shared/ui/Controlled";
import { FileAddOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../../../../app/store/hooks";

import cls from "./index.module.scss";

interface Props {}

const CreateBoard = ({}: Props) => {
  const { methods, onSubmit } = useCreateBoard();
  const currentUser = useAppSelector((state) => state.profile.profile);

  return (
    <FormProvider {...methods}>
      <form className={cls.from} onSubmit={onSubmit}>
        <Controlled.Input
          type="text"
          name="title"
          inputClassName={cls.input}
          placeholder="Создать доску"
          suffix={<FileAddOutlined />}
        />
        <Tooltip
          title={currentUser ? "" : "Войдите, чтобы создавать свои доски"}
        >
          <Button
            className={cls.btn}
            type="primary"
            htmlType="submit"
            variant="solid"
          >
            Создать
          </Button>
        </Tooltip>
      </form>
    </FormProvider>
  );
};

export default CreateBoard;
