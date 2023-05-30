import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./query/weather-api";
import { newsApi } from "./query/news-api";
import weatherSlice from "./action/weather-slice";

const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    weatherState: weatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([weatherApi.middleware, newsApi.middleware]),
});

export default store;
