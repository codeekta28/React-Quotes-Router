import React, { useState } from "react";
import styles from "./QuoteForm.module.css";
import Card from "../UI/Card/Card";
import { Prompt } from "react-router-dom";
import { useRef, useEffect } from "react";

function QuoteForm(props) {
  const [isEntering, setIsEntering] = useState(false);
  // useRef
  const authorInputRef = useRef();
  const msgInputRef = useRef();
 useEffect(()=>{
 authorInputRef.current.focus()
 setIsEntering(true)
 },[])

  //   submithandler
  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      author: authorInputRef.current.value,
      msg: msgInputRef.current.value,
    };
    props.onFormSubmit(formData);
    authorInputRef.current.value = "";
    msgInputRef.current.value = "";
  }
  function formOnFocusHandler() {
    // console.log("entered");
    setIsEntering(true)
  }
  function formLeavingHandler() {
 setIsEntering(false)
  }
  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) =>
          `Are you sure you want to leave to ? All your entered data will be lost!`
        }
      />
      <Card>
        <form onFocus={formOnFocusHandler} onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="author">Msg</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              ref={msgInputRef}
            ></textarea>
          </div>
          <div className={styles.actions}>
            <button onClick={formLeavingHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
     
    </>
  );
}

export default QuoteForm;
