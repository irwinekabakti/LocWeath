import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme/theme";
import { DashboardContainer, MiddleContainer } from "../../theme/Styled";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import LeftNav from "../../components/LeftNav";

const RootLayout = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <TopNav />
        <DashboardContainer>
          <LeftNav />
        </DashboardContainer>
        <main>
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
