import { Link } from "react-router";

import cls from "./index.module.scss";

interface Props {}

const LoginFooter = ({}: Props) => {
  return (
    <div className={cls.authFooter}>
      <Link className={cls.link} to="#">
        Не удается войти в систему?
      </Link>
      <Link className={cls.link} to="/registration">
        Создать аккаунт
      </Link>
    </div>
  );
};

export default LoginFooter;
