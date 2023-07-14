import React from "react";

const RatingContext = React.createContext({
  active: null,
  rating: null,
  activeFilter: null,
  ratingHandler: () => {},
  activeHandler: () => {},
  activeFilterHandler: () => {},
});

export default RatingContext;
