import { Suspense, useEffect } from "react";

import { Navigate, Outlet, Route, Routes } from "react-router";

import NotFound from "../app/NotFound";
import { userApi } from "../app/Profile/api";
import { useAppDispatch } from "../app/store/hooks";
import { setUserProfileData } from "../app/store/profileSlice";
import { Loading } from "../shared/ui";

import { RoutePath, privatePages, publicPages, sharedBoard } from "./config";

interface Props {
  isPublic?: boolean;
}

export const NavigationGuard = ({ isPublic = false }: Props) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (isPublic) {
    return token ? <Navigate to={RoutePath.boards()} replace /> : <Outlet />;
  }

  if (token) {
    return <Outlet />;
  }

  return <Navigate to={RoutePath.login()} replace />;
};

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const { data, isFetching, isSuccess, isError } = userApi.useGetProfileQuery(
    undefined,
    {
      skip: !token,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserProfileData(data));
    }
    if (isError) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  }, [isSuccess, isError, data]);

  if (isFetching) {
    return <div>Загрузка</div>;
  }
  return (
    <Routes>
      <Route element={<NavigationGuard />}>
        {privatePages.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route
          path="/"
          element={<Navigate to={RoutePath.boards()} replace />}
        />
      </Route>

      <Route element={<Outlet />}>
        {sharedBoard.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route element={<NavigationGuard isPublic />}>
        {publicPages.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path="/" element={<Navigate to={RoutePath.login()} replace />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
