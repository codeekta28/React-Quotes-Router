import React from "react";
import styles from "./QuotesInList.module.css";
import QuotesListItem from "./QuotesListItem";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

function QuotesInList(props) {
  const match = useRouteMatch();
  // console.log("match",match);
  // sorting function
  function sorting(quotes, ascending) {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  }

  const history = useHistory();
  const location = useLocation();
  //location gives an object with serch key containing actual sort?asc data but it is in string
  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sorting(props.lists, isAscending);

  // Mapping list item
  const listItem = sortedQuotes.map((val) => {
    return (
      <QuotesListItem
        key={val.id}
        id={val.id}
        msg={val.msg}
        author={val.author}
      />
    );
  });
  function changeSortingHandler() {
    // history.push(`${match.path}?sort=${isAscending?"des":"asc"}`)
    // Or U can write Like this
    history.push({
      pathname: match.path,
      search: `?sort=${isAscending ? "des" : "asc"}`,
    });
  }
  // It works opposite means if isAscending is true that means i am sorting in ascending mode so want to descend and if false than ascending
  const sortingButtonText = isAscending ? "Descending" : "Ascending";

  return (
    <>
      <div className={styles.sorting}>
        <button onClick={changeSortingHandler}>Sort {sortingButtonText}</button>
      </div>
      <ul className={styles.list}>{listItem}</ul>
    </>
  );
}

export default QuotesInList;
