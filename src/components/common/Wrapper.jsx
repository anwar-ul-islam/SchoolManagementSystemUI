import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Wrapper = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
};

export default Wrapper;
