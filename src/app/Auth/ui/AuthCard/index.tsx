import cls from "./index.module.scss";

import trelloIcon from "~/icons/trello.svg";

interface Props {
  header: string;
  children: React.ReactNode;
}

const AuthCard = ({ header, children }: Props) => {
  return (
    <div className={cls.authCard}>
      <div className={cls.header}>
        <img className={cls.trelloIcon} src={trelloIcon} alt="Трелло" />
        <h3 className={cls.invite}>{header}</h3>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
