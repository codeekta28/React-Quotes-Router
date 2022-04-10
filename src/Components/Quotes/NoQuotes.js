import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./NoQuotes.module.css"

function NoQuotes() {
    return (
        <div className={classes.noquotes}>
          <p>No quotes found!</p>
          <Link className='btn' to='/addquote'>
            Add a Quote
          </Link>
        </div>
      );
}

export default NoQuotes