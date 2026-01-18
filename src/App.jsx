import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Checkin from "./components/Checkin";
import Alerts from "./components/Alerts";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "students", element: <Students /> },
        { path: "checkin", element: <Checkin /> },
        { path: "alerts", element: <Alerts /> },
        { path: "notifications", element: <Notifications /> },
        { path: "settings", element: <Settings /> }
      ]
    }
  ]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;
