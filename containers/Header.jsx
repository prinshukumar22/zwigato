"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import Navbar from "@/components/Navbar";
const Header = ({ setFilteredData, dummydata }) => {
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  const fetchSearchedResults = (text) => {
    const regText = new RegExp(text, "i");
    return dummydata.filter((data) => {
      return regText.test(data.heading) || regText.test(data.desc);
    });
  };

  const submitHandler = (e) => {
    clearTimeout(searchTimeOut);
    setSearchTimeOut(
      setTimeout(() => {
        const searchedResult = fetchSearchedResults(e.target.value);
        setFilteredData(searchedResult);
      }, 500)
    );
  };
  return (
    <header className={styles.header}>
      <Navbar></Navbar>
      <div className={styles.title}>
        <h1>zwigato</h1>
        <p>Discover the best food & drinks</p>
      </div>
      <form
        className={styles.form}
        onSubmit={() => {
          e.preventDefault();
        }}
      >
        <i className="sc-rbbb40-1 iFnyeo" color="#828282" size="18">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#828282"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            aria-labelledby="icon-svg-title- icon-svg-desc-"
            role="img"
            className="sc-rbbb40-0 iwHbVQ"
          >
            <title>Search</title>
            <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
          </svg>
        </i>
        <input
          type="text"
          placeholder="Search for a restaurant, cuisine or a dish"
          onChange={submitHandler}
        ></input>
      </form>
    </header>
  );
};

export default Header;
