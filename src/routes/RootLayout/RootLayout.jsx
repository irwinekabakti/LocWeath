import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import LeftNav from "../../components/LeftNav";
import Searchbar from "../../components/Searchbar";

const RootLayout = () => {
  return (
    <>
      <TopNav />
      <LeftNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
