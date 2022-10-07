/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countries",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1/",
  }),
  endpoints: (builder) => ({
    fetchAllCountries: builder.query({
      query: () => ({ url: "/all", method: "get" }),
      transformResponse: (response, meta, arg) => {
        let countriesArr = response.map((item) => {
          return {
            name: item.name.common,
            population: item.population.toLocaleString(),
            region: item.region,
            capital: String(item.capital || "nil"),
            flag: item.flags.png,
          };
        });

        console.log(countriesArr);

        return countriesArr;
      },
    }),
    fetchCountryDetails: builder.query({
      query: (countryName) => ({
        url: `/all`,
        method: "get",
      }),
      transformResponse: (response, meta, arg) => {
        let countriesArr = response.map((item) => {
          return [item.cca3, item.name.common];
        });

        let data = response.filter((item) => item.name.common === arg);
        const borders = (arr) => {
          let newArr = [],
            coun = "";

          if (arr != undefined) {
            for (let item of arr) {
              coun = countriesArr.filter((a) => a[0] === item);
              newArr.push(coun[0][1]);
            }
          }

          return newArr;
        };

        let countryArr = data.map((item) => {
          const lang = (obj) => {
            let arr = Object.entries(obj),
              newArr = [];

            for (let item of arr) {
              newArr.push(item[1]);
            }

            return newArr.join(", ");
          };

          const cur = (obj) => {
            let arr = Object.entries(obj),
              newArr = [];

            for (let item of arr) {
              newArr.push(item[1].name);
            }

            return newArr.join(", ");
          };

          console.log(countriesArr);
          // console.log(countryArr);

          return {
            commonName: item.name.common,
            nativeName: Object.entries(item.name.nativeName)[0][1].common,
            population: item.population.toLocaleString(),
            region: item.region,
            subRegion: item.subregion || "nil",
            continent: String(item.continents),
            capital: String(item.capital || "nil"),
            tld: String(item.tld),
            currencies: cur(item.currencies),
            languages: lang(item.languages),
            borders: borders(item.borders),
            bordersShort: item.borders,
            flag: item.flags.png,
          };
        });

        return countryArr;
      },
    }),
  }),
});

export const { useFetchAllCountriesQuery, useFetchCountryDetailsQuery } =
  countriesApi;
