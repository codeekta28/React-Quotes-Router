import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../Helper/Helper";
import Loader from "../UI/Loader/Loader"

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const{onAddComment}=props
  useEffect(()=>{
    if(status==="completed" && !error){
      onAddComment()
    }

  },[status,onAddComment,error])

  const submitFormHandler = (event) => {
    event.preventDefault();
    const commentData = commentTextRef.current.value;

    sendRequest({comment:commentData,quoteId:props.quoteId});
    commentTextRef.current.value=""
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status==="pending" && <Loader/>}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
