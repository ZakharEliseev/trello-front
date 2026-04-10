import { SOCIAL_PROVIDERS } from "../../models/constants";
import GoogleAuthBtn from "../../ui/AuthBtns/GoogleAuth";
import PassKey from "../../ui/AuthBtns/PassKeyBtn";
import AuthCard from "../../ui/AuthCard";
import LoginForm from "../../ui/Forms/LoginForm";
import LoginFooter from "../../ui/LoginFooter";

import cls from "./index.module.scss";

interface Props {}

const Login = ({}: Props) => {
  return (
    <div className={cls.main}>
      <div className={cls.content}>
        <AuthCard header={"Войдите, чтобы продолжить"}>
          <LoginForm />
          <div className={cls.passKey}>
            <PassKey />
          </div>
          <div className={cls.anotherAuth}>
            <GoogleAuthBtn />
            {SOCIAL_PROVIDERS.map((provider) => (
              <button
                onClick={() => alert("Эти кнопки еще не работают")}
                className={cls.authBtn}
                key={provider.id}
              >
                <img src={provider.src} alt={provider.alt} />
                {provider.label}
              </button>
            ))}
          </div>
          <LoginFooter />
        </AuthCard>
      </div>
    </div>
  );
};

export default Login;
