import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `https://bing-news-search1.p.rapidapi.com/news`;

const newsHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_APP_NEWS_TOKEN,
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const requestNews = (url) => ({ url, headers: newsHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getWeatherNews: builder.query({
      query: (location) =>
        requestNews(
          `/search?q=${location}%20Weather&freshness=Day&textFormat=Raw&safeSearch=Off`
        ),
    }),
  }),
});

export const { useGetWeatherNewsQuery } = newsApi;
