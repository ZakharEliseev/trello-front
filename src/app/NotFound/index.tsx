import { useRef } from "react";

import { useAnimationFrame } from "motion/react";

import clsx from "clsx";
import { useNavigate } from "react-router";

import { HomeOutlined } from "@ant-design/icons";

import { RoutePath } from "../../routes/config";

import cls from "./index.module.scss";

const NotFound = () => {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const rotate = Math.sin(t / 8000) * 200;
    const y = (1 + Math.sin(t / 10000)) * -50;
    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
  });

  const navigate = useNavigate();

  return (
    <>
      <div className={cls.main}>
        <div
          className={cls.toMainPage}
          onClick={() => navigate(RoutePath.boards(), { replace: true })}
        >
          На главную <HomeOutlined />
        </div>
        <div className={cls.container}>
          <div className={cls.cube} ref={ref}>
            <div className={clsx(cls.side, cls.front)}>404</div>
            <div className={clsx(cls.side, cls.left)}>404</div>
            <div className={clsx(cls.side, cls.right)}>404</div>
            <div className={clsx(cls.side, cls.top)}>404</div>
            <div className={clsx(cls.side, cls.bottom)}>404</div>
            <div className={clsx(cls.side, cls.back)}>404</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
