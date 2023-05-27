import React from "react";
import { Stack } from "@mui/material";
import loadingImg from "../image/sun.gif";

const Loader = () => {
  return (
    <>
      <Stack
        sx={{ marginTop: 20 }}
        direction="row"
        justifyContent="center"
        alignContent="center">
        <img src={loadingImg} alt="loading-img" className="loader" />
      </Stack>
    </>
  );
};

export default Loader;
