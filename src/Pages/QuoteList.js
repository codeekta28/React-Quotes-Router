import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import QuotesInList from "../Components/Quotes/QuotesInList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../Helper/Helper";
import Loader from "../Components/UI/Loader/Loader";
import NoQuotes from "../Components/Quotes/NoQuotes"

function QuoteList(props) {
  const { sendRequest, data, status, error } = useHttp(getAllQuotes, true);
  // console.log("status",status);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }
  if (status === "error") {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!data || data.length === 0)) {
    return <NoQuotes/>;
  }
  // console.log("data",data);
  return (
    <div>
      <h1>Quote List</h1>
      <QuotesInList lists={data} />
    </div>
  );
}

export default QuoteList;
