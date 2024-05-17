import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// components
import LoadingScreen from "../components/LoadingScreen";

import RouteConstants from "../constants/RouteConstants";
// import AuthGuard from 'src/guards/AuthGuard';
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "src/guards/AuthGuard";
import OpsConfiguration from "src/pages/OpsConfig";


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <Navigate
          to={`${RouteConstants.ROOT_AUTH}/${RouteConstants.LOGIN}`}
          replace
        />
      ),
    },


    {
      path: RouteConstants.ROOT_AUTH,
      children: [
        {
          path: RouteConstants.LOGIN,
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },

     

      ],
    },
    {
      element: (
        <GuestGuard>
          <DashboardLayout />
        </GuestGuard>
      ),
      path: "dashboard",
      children: [
        {path:"config",element: <OpsConfiguration />},
        {path:"edit_config",element:<EditOpsConfiguration />},
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <NotFound /> },

      ],
    },
   
  ]);
}

// Dashboard

const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const EditOpsConfiguration = Loadable(lazy(() => import("../pages/EditOpsConfiguration")));

// const ModbusConfiguration = lazy(() => import("../pages/ModbusConfiguration"));
// const EditModbusConfiguration = lazy(() => import("../pages/EditModbusConfiguration"));
// const EditGatewayConfiguration = lazy(() => import("../pages/EditGatewayConfiguration"));
// const GatewayConfiguration = lazy(() => import("../pages/GatewayConfiguration"));