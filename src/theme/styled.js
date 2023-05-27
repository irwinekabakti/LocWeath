import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Colors } from "../helper/color";
import { Paper, LinearProgress, linearProgressClasses } from "@mui/material";

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    overflow: "scroll",
  },
  "*::-webkit-scrollbar": {
    width: "1px",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: Colors.blue,
  },
}));

const LeftNavContainer = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.secondaryBackground,
  width: "20%",
  height: "100vh",
  color: Colors.blue,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MiddleContainer = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.background,
  width: "50%",
  overflow: "scroll",
  overflowX: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    overflow: "visible",
  },
}));

const WeatherContainer = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.tertiaryBackground,
  width: "30%",
  overflow: "scroll",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    overflow: "visible",
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  marginTop: "2rem",
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  width: "15rem",
  borderRadius: 20,
  marginBottom: 30,
  backgroundColor: "#2A4263",
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    backgroundColor: Colors.lightBlue,
  },
}));

const SpaceAroundPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  padding: "1rem",
  justifyContent: "space-around",
  alignItems: "center",
}));

export {
  DashboardContainer,
  LeftNavContainer,
  MiddleContainer,
  WeatherContainer,
  ContentContainer,
  StyledLinearProgress,
  SpaceAroundPaper,
};
