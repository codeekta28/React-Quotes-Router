import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../Components/Quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../Helper/Helper";

function AddQuote() {
  const{sendRequest,status} =  useHttp(addQuote)
  const history = useHistory();
  useEffect(()=>{
  if(status==="completed"){
    history.push("/quotelist")
  }
  },[status,history])
  function addQuoteHandler(quoteData) {
    // console.log("quotes", quoteData);
    sendRequest(quoteData)
   
  }

  return <QuoteForm onFormSubmit={addQuoteHandler} />;
}
export default AddQuote;
