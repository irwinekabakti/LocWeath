import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/action/weather-slice";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useGetForecastWeatherQuery } from "../store/query/weather-api";
import moment from "moment";
import useGeoLocation from "../hooks/useGeolocation";
import WeatherChart from "../components/Chart";
import TodaysOverview from "../components/TodaysOverview";
import Searchbar from "../components/Searchbar";
import ThreeDaysForecast from "../components/ThreeDaysForecast";
import Loader from "../components/Loader";

const Dashboard = () => {
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;
  const locationState = useSelector((state) => state.weatherState.location);
  const { data, isFetching } = useGetForecastWeatherQuery(locationState);
  const dispatch = useDispatch();

  // console.log(data);

  const current = data?.current;
  const forecast = data?.forecast?.forecastday;
  const location = data?.location;
  const dateToFormat = location?.localtime;

  useEffect(() => {
    let currentLocation = "";

    if (locationState) {
      currentLocation = locationState;
    } else if (getGeoLocation?.loaded)
      currentLocation = [
        getGeoLocation?.coordinates.lat,
        getGeoLocation?.coordinates.lng,
      ];

    dispatch(setLocation(currentLocation));
  }, [
    dispatch,
    getGeoLocation?.coordinates.lat,
    getGeoLocation?.coordinates.lng,
    getGeoLocation?.loaded,
    locationState,
  ]);

  if (isFetching || !isLoadingLocation) {
    return <Loader />;
  }

  return (
    <>
      <Box p={4}>
        <Stack
          direction={{ sm: "column", md: "row" }}
          justifyContent="space-between"
          sx={{ paddingBottom: 2 }}>
          <Stack>
            <Typography variant="h5">{location?.name}</Typography>
            <Typography variant="subtitle2">{location?.region}</Typography>
            <Typography variant="subtitle2">
              {moment(dateToFormat).format("LLLL")}
            </Typography>
          </Stack>
          <Searchbar location={location} />
        </Stack>
        <Divider />
        <TodaysOverview current={current} forecast={forecast} />
        <ThreeDaysForecast forecast={forecast} />
        <WeatherChart forecast={forecast} />
      </Box>
    </>
  );
};

export default Dashboard;
