"use client";
import React from "react";
import styles from "./product.module.css";
import Filter from "@/utils/Filter";
import Card2 from "@/Ui/Card2";
import { useState, useContext, useRef } from "react";
import RatingContext from "@/store/context-api";
import { database, uri } from "@/utils/constants";
import Backdrop from "@/components/Backdrop";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

let cuisines = [];

const Page = ({ params }) => {
  const ctx = useContext(RatingContext);
  const searchParams = useSearchParams();
  const cuisineData = database?.data?.filters[0]?.options;
  const [filteredCuiData, setFilteredCuiData] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  // console.log(ctx);
  const data = database?.data?.cards[2]?.data?.data?.cards;
  const [restaurantData, setRestaurantData] = useState(data);
  const [backdrop, setBackdrop] = useState(false);
  const [cuisineDropdown, setCuisineDropdown] = useState(false);
  let filteredData = restaurantData.filter((data) => {
    return parseInt(data?.data?.avgRating) >= ctx.rating;
  });

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

  if (ctx.apply) {
    if (ctx.sortby === "rating") {
      filteredData.sort((a, b) => b?.data?.avgRating - a?.data?.avgRating);
    }

    if (ctx.sortby === "costLtH") {
      filteredData.sort((a, b) => a?.data?.costForTwo - b?.data?.costForTwo);
    }

    if (ctx.sortby === "costHtL") {
      filteredData.sort((a, b) => b?.data?.costForTwo - a?.data?.costForTwo);
    }

    if (cuisines.length > 0) {
      filteredData = filteredData.filter((data) => {
        let flag = false;
        if (cuisines.length <= 0) return true;
        for (let i = 0; i < cuisines.length; i++) {
          if (data?.data?.cuisines.includes(cuisines[i])) {
            flag = true;
            break;
          }
          flag = false;
        }
        return flag;
      });
      cuisines = [];
    }

    if (ctx.rangeValue >= 0) {
      filteredData = filteredData.filter(
        (data) => data?.data?.costForTwo === ctx.rangeValue * 100
      );
    }
  }

  console.log(filteredData);
  const ratingRef = useRef();
  return (
    <>
      {backdrop && (
        <Backdrop backdropHandler={setBackdrop} cuisines={cuisines} />
      )}
      <div className={styles.container}>
        <div className={styles.filter}>
          <div className={styles.filteritem}>
            <button
              type="button"
              className={`${
                ctx.active === "filter" ? styles.active : styles.button
              }`}
              onClick={() => {
                setBackdrop(true);
                setCuisineDropdown(false);
              }}
            >
              <Filter></Filter>
              Filters
            </button>
            <button
              type="button"
              className={`${
                ctx.active === "rating" ? styles.active : styles.button
              }`}
              onClick={() => {
                ctx.activeHandler("rating");
                ctx.ratingHandler(parseInt(ratingRef.current.textContent));
                setCuisineDropdown(false);
              }}
            >
              Rating: <span ref={ratingRef}>{ctx.rating}+</span>
            </button>
            <button
              type="button"
              className={`${
                ctx.active === "cuisine" ? styles.active : styles.button
              }`}
              onClick={() => {
                setCuisineDropdown((prev) => !prev);
              }}
            >
              Cuisines
            </button>
            <div className={styles.logo}>
              <button className={styles.buttonLogo}>
                <Link href="/">Zwigato</Link>
              </button>
            </div>
            {cuisineDropdown && (
              <form
                className={`${styles.cuiform}`}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                            <label htmlFor={cuisine.option}>
                              {cuisine.option}
                            </label>
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
                            <label htmlFor={cuisine.option}>
                              {cuisine.option}
                            </label>
                          </div>
                        );
                      })}
                </div>
                <footer className={styles.footer}>
                  <div></div>
                  <div className={styles.funcButtons}>
                    <p
                      onClick={() => {
                        setBackdrop(false);
                        location.reload();
                      }}
                    >
                      Clear All
                    </p>
                    <button
                      type="submit"
                      onClick={() => {
                        setCuisineDropdown(false);
                        ctx.setApply(true);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </footer>
              </form>
            )}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.section}>
            <h2>Results for {params.id} :</h2>
            <div className={styles.cardStorage}>
              {filteredData &&
                filteredData.map((data) => (
                  <Card2 key={data?.data?.id} data={data} uri={uri}></Card2>
                ))}
              {filteredData?.length <= 0 && <h1>No Restaurant Found :)</h1>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
