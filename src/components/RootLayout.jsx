import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
    </>
  );
}
