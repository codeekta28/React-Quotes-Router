import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Comments from "../Components/comments/Comments";
import HighlightedQuote from "../Components/Quotes/HighlightedQuote";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import {getSingleQuote } from "../Helper/Helper";
import Loader from "../Components/UI/Loader/Loader"

const quotes = [
  { id: "q1", author: "ekta", msg: "learning is fun" },
  { id: "q2", author: "kush", msg: "learning is awesome" },
];

function QuoteDetail() {
  const { sendRequest, data, status, error } = useHttp(getSingleQuote, true);
  const listDetail = useParams();
  const match = useRouteMatch();
 const{quotelistid}=listDetail
  useEffect(()=>{
    sendRequest(quotelistid)
  },[sendRequest,quotelistid])
  // console.log("data",data);
if(status==="pending"){
  return <Loader/>
}
if(status==="error"){
  return <p className="centered">{error}</p>
}
if(!data.msg){
  return <p className="centered">No Quotes Found</p>
}

// console.log("data",data);
  return (
    <div>
      <h1>Quote Detail</h1>
      <HighlightedQuote msg={data.msg} author={data.author} />
      {/* <Route path="/quotelist/:quotelistid/comment"> */}
      {/* or */}

      {/* I want this route to show only when there is no comment page as soon as comment page comes i want it to disappear  this is a good way to use react routing as we are showing conditional content concentrate over this*/}
      <Route path={match.url} exact>
        <div className="centered">
          <Link
            className="btn--flat"
            to={`/quotelist/${listDetail.quotelistid}/comment`}
          >
            Comment
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comment`}>
        <Comments quoteId={listDetail.quotelistid} />
      </Route>
    </div>
  );
}

export default QuoteDetail;
