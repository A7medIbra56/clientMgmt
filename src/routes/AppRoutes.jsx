import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ClientManagement from "../pages/ClientManagement";
import ClientForm from "../pages/ClientForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ClientManagement />, 
      },
      {
        path: "add-client",
        element: <ClientForm />, 
      },
      {
        path: "edit-client/:id",
        element: <ClientForm />, 
      }
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}