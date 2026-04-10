import { Link } from "react-router";

import cls from "./index.module.scss";

interface Props {}

const RegistrationFooter = ({}: Props) => {
  return (
    <div className={cls.authFooter}>
      <Link className={cls.link} to="/login">
        Уже есть аккаунт? Войти.
      </Link>
    </div>
  );
};

export default RegistrationFooter;
