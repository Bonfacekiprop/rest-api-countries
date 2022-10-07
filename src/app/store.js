import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { countriesApi } from "../services/countries.api";
import filterReducer from "../features/reducers/filters";

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

setupListeners(store.dispatch);
