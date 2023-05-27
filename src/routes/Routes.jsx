import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import { Dashboard, Map, Saves } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/map", element: <Map /> },
      { path: "/saves", element: <Saves /> },
    ],
  },
]);

export default router;
