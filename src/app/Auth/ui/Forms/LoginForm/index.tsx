import { Button, Tooltip } from "antd";
import { FormProvider } from "react-hook-form";

import { Controlled } from "@/shared/ui/Controlled";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";

import { useLoginForm } from "../../../hooks/useLoginForm";

import cls from "./index.module.scss";

const LoginForm = () => {
  const { methods, onSubmit } = useLoginForm();

  return (
    <FormProvider {...methods}>
      <form className={cls.form} onSubmit={onSubmit}>
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
          Продолжить
        </Button>
        <div className={cls.remember}>
          <Controlled.Checkbox name="rememberMe" className={cls.remember}>
            Запомнить меня
          </Controlled.Checkbox>
          <Tooltip
            title="Мы запомним данные вашего аккаунта и используем их при вашем следующем входе в систему."
            placement="bottom"
            classNames={{ root: cls.tooltip }}
          >
            <ExclamationCircleOutlined className={cls.tooltipIcon} />
          </Tooltip>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
