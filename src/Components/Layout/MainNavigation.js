import React from "react";
import styles from "./MainNavigation.module.css";
import { NavLink,Link } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}><Link to="/addquote">Great Quotes</Link></div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/addquote">
              Add Quote
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/quoteList">
              Quote List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
