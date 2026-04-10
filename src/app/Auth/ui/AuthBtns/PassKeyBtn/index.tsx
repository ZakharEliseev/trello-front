import cls from "./index.module.scss";

import key from "~/icons/key.svg";

const PassKey = () => {
  return (
    <div>
      <button
        onClick={() => alert("Эти кнопки еще не работают")}
        className={cls.authBtn}
      >
        <img src={key} alt="PassKey" />
        PassKey
      </button>
    </div>
  );
};

export default PassKey;
