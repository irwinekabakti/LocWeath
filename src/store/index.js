import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { weatherApi } from "./query/weather-api";
import weatherSlice from "./action/weather-slice";

const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    weatherState: weatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
