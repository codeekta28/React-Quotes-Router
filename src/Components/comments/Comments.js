import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "./Comments.module.css";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../Helper/Helper";
import NewCommentForm from "./NewCommentForm";
import Loader from "../UI/Loader/Loader";
import CommentsList from "./CommentsList";

const Comments = (props) => {
  const { sendRequest, data, status } = useHttp(getAllComments);
  const { quoteId } = props;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  // addCommentHandler
  // we are using useCallBack bcoz addcommet is in useEffect in newComment form and every rendering of this page make this function render that will affect the useEffect of newCommentForm
  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comment;
  if (status === "pending") {
    comment = (
      <div className="centered">
        <Loader />
      </div>
    );
  }
  if (status === "completed" && data.length > 0 && data) {
    comment = <CommentsList comments={data} />;
  }
  if (status === "completed" && (!data || data.length === 0)) {
    comment = <p className="centered">No Comments were added yet</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={props.quoteId}
          onAddComment={addCommentHandler}
        />
      )}
      {comment}
    </section>
  );
};

export default Comments;
