import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../pages/login-page";
import { ClassesPage } from "../../pages/classes-page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/classes",
    element: <ClassesPage />,
  }
]);