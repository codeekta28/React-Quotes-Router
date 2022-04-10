import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AddQuote from "./Pages/AddQuote";

import Layout from "./Components/Layout/Layout";
import { getAllQuotes } from "./Helper/Helper";
import React from "react";
import { Suspense } from "react";
import Loader from "./Components/UI/Loader/Loader";

// LazyLoading
const QuoteList = React.lazy(() => import("./Pages/QuoteList"));
const QuoteDetail = React.lazy(() => import("./Pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <AddQuote />
            </Route>
            <Route path="/addquote">
              <AddQuote />
            </Route>
            <Route path="/quotelist" exact>
              <QuoteList />
            </Route>
            <Route path="/quotelist/:quotelistid">
              <QuoteDetail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
