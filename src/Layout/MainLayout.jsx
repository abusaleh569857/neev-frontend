import React from "react";
import Navbar from "../Shared/NavBar";
import { Outlet } from "react-router-dom";
import HomeNavBar from "../components/HomeNavbar";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div className="font-sans">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <HomeNavBar></HomeNavBar>
    </div>
  );
};

export default MainLayout;
