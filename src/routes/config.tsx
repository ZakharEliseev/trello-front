import { ComponentType, LazyExoticComponent, lazy } from "react";

export const RoutePath = {
  root: () => "/",
  boards: () => "/boards",
  login: () => "/login",
  registration: () => "/registration",
  board: (id: string) => `/board/${id || ":id"}`,
  hashed: (shareHash: string) => `/shared/${shareHash || ":shareHash"}`,
};

type RouteConfig = {
  path: string;
  Component: LazyExoticComponent<ComponentType<any>>;
};

export const privatePages: RouteConfig[] = [
  {
    path: RoutePath.boards(),
    Component: lazy(() => import("@/app/Boards/Pages/Boards")),
  },
  {
    path: RoutePath.board(":id"),
    Component: lazy(() => import("@/app/Boards/Pages/BoardById")),
  },
];

export const publicPages: RouteConfig[] = [
  {
    path: RoutePath.login(),
    Component: lazy(() => import("@/app/Auth/Pages/Login")),
  },
  {
    path: RoutePath.registration(),
    Component: lazy(() => import("@/app/Auth/Pages/Registration")),
  },
];

export const sharedBoard: RouteConfig[] = [
  {
    path: RoutePath.hashed(":shareHash"),
    Component: lazy(() => import("@/app/Boards/Pages/SharedBoardPage")),
  },
];
