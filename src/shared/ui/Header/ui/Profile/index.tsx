import { Tooltip } from "antd";
import { useNavigate } from "react-router";

import { useAppSelector } from "@/app/store/hooks";
import { RoutePath } from "@/routes/config";
import { LogoutOutlined } from "@ant-design/icons";
import { googleLogout } from "@react-oauth/google";

import cls from "./index.module.scss";

interface Props {}

const Profile = ({}: Props) => {
  const currentUser = useAppSelector((state) => state.profile.profile);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    googleLogout();
    navigate(RoutePath.login());
  };

  const handleClick = () => {
    currentUser ? logout() : navigate(RoutePath.login());
  };

  return (
    <div className={cls.profile}>
      <p className={cls.userInfo}>
        {currentUser
          ? `${currentUser.username} ${currentUser?.email}`
          : "Гость"}
      </p>
      <div onClick={handleClick} className={cls.logoutIcon}>
        <Tooltip title={currentUser ? "Выйти" : "Войти"}>
          <LogoutOutlined />
        </Tooltip>
      </div>
    </div>
  );
};

export default Profile;
