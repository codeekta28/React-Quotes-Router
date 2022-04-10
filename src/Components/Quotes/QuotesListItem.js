import React from 'react'
import styles from "./QuotesListItem.module.css"
import { Link } from 'react-router-dom'

function QuotesListItem(props) {

  return (
   <li className={styles.item}>
       <figure>
           <blockquote>
               {props.msg}
           </blockquote>
           <figcaption>
               {props.author}
           </figcaption>
       </figure>

       <Link to={`/quotelist/${props.id}`} className="btn">View FullScreen</Link>
   </li>
  )
}

export default QuotesListItem
// `/quotelist/:${props.msg}`