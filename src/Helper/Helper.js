import axios from "axios";
const baseUrl = "https://post-http-practice-default-rtdb.firebaseio.com/";

export async function getAllQuotes() {
  try {
    const url = `${baseUrl}quotelist.json`;
    const response = await axios.get(url);
    // console.log("response", response.data);
    const finalData = response.data;
    const allQuotes = [];
    for (const key in finalData) {
      const quoteObj = {
        id: key,
        ...finalData[key].body,
      };
      allQuotes.push(quoteObj);
    }
    // console.log("allquotes",allQuotes);
    return allQuotes;
  } catch (error) {
    console.log("error in all quotes", error.message);
  }
}

export async function getSingleQuote(quoteid) {
  const url = `${baseUrl}quotelist/${quoteid}.json`;
  const response = await axios.get(url);
  const finalData = response.data.body;
  // console.log("finalData",finalData);
  const loadedQuote = {
    id: quoteid,
    ...finalData,
  };
  return loadedQuote;
}

export async function addQuote(quoteData) {
  const url = `${baseUrl}quotelist.json`;
  const response = await axios.post(url, {
    method: "POST",
    body: quoteData,
    header: {
      "Content-Type": "application/json",
    },
  });
  return null
}

export async function addComment(requestData){
    const url=`${baseUrl}comments/${requestData.quoteId}.json`;
    // console.log("requestData",requestData);
    const response=await axios.post(url,{
        method:"POST",
        body:requestData.comment,
        header:{
            "Content-Type": "application/json", 
        }
    })
    return {CommentId:response.data.name}
}

export async function getAllComments(quoteId){
 const url=`${baseUrl}comments/${quoteId}.json`;
 const response=await axios.get(url);
 const finalData=response.data;
 const loadedComments=[];
 for(const key in finalData){
   const commentObj={
     id:key,
     ...finalData[key]
    }
 
     loadedComments.push(commentObj)
 }

 return loadedComments
}
