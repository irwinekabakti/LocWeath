import React, { useEffect } from "react";
import Mapbox from "../components/Mapbox";
import News from "../components/News";
import { Box, Stack } from "@mui/material";
import useGeoLocation from "../hooks/useGeolocation";
import { setLocation } from "../store/action/weather-slice";
import { useSelector, useDispatch } from "react-redux";
import { useGetForecastWeatherQuery } from "../store/query/weather-api";
import { useGetWeatherNewsQuery } from "../store/query/news-api";
import Loader from "../components/Loader";

const Map = () => {
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;

  const locationState = useSelector((state) => state.weatherState.location);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetForecastWeatherQuery(locationState);
  const location = data?.location;
  const current = data?.current;

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
  }, [getGeoLocation]);

  const { data: news } = useGetWeatherNewsQuery(location?.region);

  // console.log(news);

  if (isFetching || !isLoadingLocation) return <Loader />;

  return (
    <Box spacing={2}>
      <Stack location={location} current={current}>
        <Mapbox location={location} current={current} />
        <News news={news} />
      </Stack>
    </Box>
  );
};

export default Map;
