import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { CountriesList, CountryDetails } from "../pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={CountriesList} path="/" />
        <Route
          exact
          component={CountryDetails}
          path="/countries/:countryName"
        />
        {/* <Route component={NotFoundPage} path="*" /> */}
      </Switch>
    </BrowserRouter>
  );
};
