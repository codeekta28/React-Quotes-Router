import React from 'react'
import styles from "./HighlightedQuote.module.css"

function HighlightedQuote(props) {
  return (
    <figure className={styles.quote}>
        <p>{props.msg}</p>
        <figcaption>{props.author}</figcaption>
    </figure>
  )
}

export default HighlightedQuote