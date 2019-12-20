import React from "react";
import { Route } from "react-router-dom";
import SplashPage from "../Components/SplashPage";
import DesignSystem from "../Components/DesignSystem";
import Dashboard from "../Components/DashboardComponents/Dashboard";
import EditorTemplates from "../Components/EditorComponents/EditorTemplates";
import EditorDeploy from '../Components/EditorComponents/EditorDeploy';
import EditorInfo from '../Components/EditorComponents/EditorInfo';

export const routes = [
  {
    path: "/",
    exact: true,
    component: SplashPage
  },
  {
    path: "/design-system",
    exact: true,
    component: DesignSystem
  },
  {
    path: "/editor/templates",
    exact: true,
    component: EditorTemplates
  },
  {
    path: "/editor/info",
    exact: true,
    component: EditorInfo
  },
  {
    path: "/editor/deploy",
    exact: true,
    component: EditorDeploy
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard
  }
];

// Create auth routes and render if authorized in the home page
export const authRoutes = [
  {
    path: "/",
    exact: true
  },
  {
    path: "/design-system",
    exact: true,
    component: DesignSystem
  },
  {
    path: "/editor/templates",
    exact: true,
    component: EditorTemplates
  }
];

const Routes = () => {
  return (
    <>
      {routes.map((route, i) => (
        <Route
          key={`global_routes_${i}`}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </>
  );
};

export default Routes;
