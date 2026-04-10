import { Button } from "antd";
import { FormProvider } from "react-hook-form";

import { Controlled } from "@/shared/ui/Controlled";
import { LockOutlined } from "@ant-design/icons";

import { useRegistrationForm } from "../../../hooks/useRegistrationForm";

import cls from "./index.module.scss";

const RegistrationForm = () => {
  const { methods, onSubmit } = useRegistrationForm();

  return (
    <FormProvider {...methods}>
      <form className={cls.form} onSubmit={onSubmit}>
        <Controlled.Input
          inputClassName={cls.input}
          labelClassName={cls.label}
          name="name"
          placeholder="Введите имя"
          label="Имя пользователя"
          type="text"
          suffix={<LockOutlined />}
        />
        <Controlled.Input
          inputClassName={cls.input}
          labelClassName={cls.label}
          name="email"
          placeholder="Введите email"
          label="Электронная почта"
          type="email"
          suffix={<LockOutlined />}
        />
        <Controlled.Input
          inputClassName={cls.input}
          labelClassName={cls.label}
          name="password"
          placeholder="Введите пароль"
          label="Пароль"
          type="password"
          suffix={<LockOutlined />}
        />
        <Button
          className={cls.btn}
          type="primary"
          htmlType="submit"
          color="primary"
          variant="solid"
        >
          Зарегестрироваться
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
