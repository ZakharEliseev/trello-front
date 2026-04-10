import { SOCIAL_PROVIDERS } from "../../models/constants";
import GoogleAuthBtn from "../../ui/AuthBtns/GoogleAuth";
import AuthCard from "../../ui/AuthCard";
import RegistrationForm from "../../ui/Forms/RegistrationForm";
import RegistrationFooter from "../../ui/RegistrationFooter";

import cls from "./index.module.scss";

interface Props {}

const Registration = ({}: Props) => {
  return (
    <div className={cls.main}>
      <div className={cls.content}>
        <AuthCard header={"Зарегистрируйтесь, чтобы продолжить"}>
          <RegistrationForm />
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
          <RegistrationFooter />
        </AuthCard>
      </div>
    </div>
  );
};

export default Registration;
