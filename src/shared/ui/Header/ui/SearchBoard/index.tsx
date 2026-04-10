import { Button, Tooltip } from "antd";
import { FormProvider } from "react-hook-form";

import { useGetBoardToHash } from "@/app/Boards/hooks/useGetBoardToHash";
import { Controlled } from "@/shared/ui/Controlled";
import { SearchOutlined } from "@ant-design/icons";

import cls from "./index.module.scss";

const SearchBoard = () => {
  const { methods, onSubmit } = useGetBoardToHash();

  return (
    <FormProvider {...methods}>
      <form className={cls.from} onSubmit={onSubmit}>
        <Controlled.Input
          type="text"
          name="shareHash"
          inputClassName={cls.input}
          placeholder="Найти доску по публичной ссылке"
          prefix={<SearchOutlined />}
        />
        <Tooltip title={"Вставьте hash строку в поле поиска"}>
          <Button
            className={cls.btn}
            type="primary"
            htmlType="submit"
            variant="solid"
          >
            Найти
          </Button>
        </Tooltip>
      </form>
    </FormProvider>
  );
};

export default SearchBoard;
