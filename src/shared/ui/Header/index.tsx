import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { Tooltip } from "antd";
import { useNavigate } from "react-router";

import CreateBoard from "@/shared/ui/Header/ui/CreateBoard";
import {
  FileAddOutlined,
  FileSearchOutlined,
  TableOutlined,
} from "@ant-design/icons";

import { RoutePath } from "../../../routes/config";

import Profile from "./ui/Profile";
import SearchBoard from "./ui/SearchBoard";

import cls from "./index.module.scss";

type InputMode = "search" | "create";

export const Navbar = () => {
  const [activeInputMode, toggleMode] = useState<InputMode>("create");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <div className={cls.navbar}>
      <div className={cls.navItems}>
        <div onClick={() => navigate(RoutePath.boards())} className={cls.link}>
          <Tooltip title={activeInputMode ? "Поиск доски" : "Создать доску"}>
            <TableOutlined className={cls.boardsImg} alt="Все доски" />
          </Tooltip>
        </div>
        <div className={cls.link}>
          {activeInputMode === "search" ? (
            <Tooltip title="Найти доску по публичной ссылке">
              <FileSearchOutlined
                className={cls.searchImg}
                alt="Найти доску по публичной ссылке"
                onClick={() => toggleMode("create")}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Создать доску">
              <FileAddOutlined
                className={cls.searchImg}
                alt="Создать доску"
                onClick={() => toggleMode("search")}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {activeInputMode === "create" ? (
          <motion.div
            key="create"
            initial={isFirstRender ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cls.motionWrapper}
          >
            <CreateBoard />
          </motion.div>
        ) : (
          <motion.div
            key="search"
            initial={isFirstRender ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cls.motionWrapper}
          >
            <SearchBoard />
          </motion.div>
        )}
      </AnimatePresence>
      <Profile />
    </div>
  );
};
