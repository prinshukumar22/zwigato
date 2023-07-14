"use client";
import React from "react";
import RatingContext from "@/store/context-api";
import styles from "./filters.module.css";
import { useContext, useRef, useState } from "react";
import { database } from "@/utils/constants";
const Filters = ({ cuisines }) => {
  const ctx = useContext(RatingContext);
  const rangeRef = useRef();
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [filteredCuiData, setFilteredCuiData] = useState([]);
  const cuisineData = database?.data?.filters[0]?.options;
  // console.log(cuisineData);
  const fetchCuisineData = (text) => {
    const regText = new RegExp(text, "i");
    return cuisineData.filter((cuisine) => {
      return regText.test(cuisine.option);
    });
  };

  const searchHandler = (e) => {
    clearTimeout(searchTimeOut);
    setSearchTimeOut(
      setTimeout(() => {
        const searchedResult = fetchCuisineData(e.target.value);
        setFilteredCuiData(searchedResult);
      }, 500)
    );
  };
  if (ctx.activeFilter === "sortby") {
    return (
      <div className={styles.form}>
        <form>
          <div className={styles.rating}>
            <label>
              <input
                type="radio"
                name="popularity"
                value="rating"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked) ctx.setSortby(e.target.value);
                }}
              />
              <span>Rating: High to Low</span>
            </label>
          </div>
          <div className={styles.costlth}>
            <label>
              <input
                type="radio"
                name="popularity"
                value="costLtH"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked) ctx.setSortby(e.target.value);
                }}
              />
              <span>Cost: Low to High</span>
            </label>
          </div>
          <div className={styles.costhtl}>
            <label>
              <input
                type="radio"
                name="popularity"
                value="costHtL"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked) ctx.setSortby(e.target.value);
                }}
              />
              <span>Cost: Low to High</span>
            </label>
          </div>
        </form>
      </div>
    );
  }
  if (ctx.activeFilter === "cuisines") {
    return (
      <div className={styles.cuiform}>
        <input
          type="text"
          placeholder="Search Here"
          className={styles.search}
          onChange={searchHandler}
        ></input>
        <div className={styles.grid}>
          {filteredCuiData.length > 0
            ? filteredCuiData.map((cuisine) => {
                return (
                  <div key={cuisine.option} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id={cuisine.option}
                      value={cuisine.option}
                      onClick={(e) => {
                        if (e.target.checked) {
                          cuisines.push(e.target.value);
                        }
                      }}
                    ></input>
                    <label htmlFor={cuisine.option}>{cuisine.option}</label>
                  </div>
                );
              })
            : cuisineData.map((cuisine) => {
                return (
                  <div key={cuisine.option} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id={cuisine.option}
                      value={cuisine.option}
                      onClick={(e) => {
                        if (e.target.checked) {
                          cuisines.push(e.target.value);
                        }
                      }}
                    ></input>
                    <label htmlFor={cuisine.option}>{cuisine.option}</label>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
  if (ctx.activeFilter === "rating") {
    return (
      <div className={styles.form}>
        <form>
          <div className={styles.rating}>
            <label>
              <input
                type="radio"
                name="rating"
                value="4OA"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked)
                    ctx.ratingHandler(parseInt(e.target.value));
                  ctx.activeHandler("rating");
                }}
              />
              <span>4 Or Above</span>
            </label>
          </div>
          <div className={styles.costlth}>
            <label>
              <input
                type="radio"
                name="rating"
                value="3OA"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked)
                    ctx.ratingHandler(parseInt(e.target.value));
                }}
              />
              <span>3 Or Above</span>
            </label>
          </div>
          <div className={styles.costhtl}>
            <label>
              <input
                type="radio"
                name="rating"
                value="2OA"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked)
                    ctx.ratingHandler(parseInt(e.target.value));
                }}
              />
              <span>2 Or Above</span>
            </label>
          </div>
          <div className={styles.costhtl}>
            <label>
              <input
                type="radio"
                name="rating"
                value="1OA"
                className={styles.input}
                onClick={(e) => {
                  if (e.target.checked)
                    ctx.ratingHandler(parseInt(e.target.value));
                }}
              />
              <span>1 Or Above</span>
            </label>
          </div>
        </form>
      </div>
    );
  }
  if (ctx.activeFilter === "cpp") {
    return (
      <div className={styles.cpp}>
        <form>
          <div className={styles.divinput}>
            <span>0</span>
            <input
              type="range"
              id="cost"
              name="cost"
              min="0"
              max="800"
              step="100"
              className={styles.rangeInput}
              ref={rangeRef}
              onChange={() => {
                ctx.setRangeValue(rangeRef.current.value);
              }}
              value={ctx.rangeValue}
            />
            <span>800</span>
          </div>
          <p>( {ctx.rangeValue} for one )</p>
        </form>
      </div>
    );
  }
};

export default Filters;
