"use client";
import RatingContext from "./context-api";
import React from "react";
import { useState } from "react";

const ContextProvider = ({ children }) => {
  const [rating, setRating] = useState(1);
  const [active, setActive] = useState(null);
  const [activeFilter, setActiveFilter] = useState("sortby");
  const [sortby, setSortby] = useState("");
  const [apply, setApply] = useState(false);
  const [rangeValue, setRangeValue] = useState(-1);
  const [cuisines, setCuisines] = useState([]);
  const ratingHandler = (rate) => {
    setRating(rate);
  };
  const activeHandler = (data) => {
    setActive(data);
  };
  const activeFilterHandler = (filter) => {
    setActiveFilter(filter);
  };
  return (
    <RatingContext.Provider
      value={{
        rating,
        active,
        activeFilter,
        sortby,
        apply,
        cuisines,
        rangeValue,
        setRangeValue,
        setCuisines,
        ratingHandler,
        activeHandler,
        activeFilterHandler,
        setSortby,
        setApply,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export default ContextProvider;
