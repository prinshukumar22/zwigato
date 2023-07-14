import React, { useContext } from "react";
import classes from "./modal.module.css";
import Filters from "@/components/Filters";
import Cross from "@/utils/Cross";
import RatingContext from "@/store/context-api";
import { database, uri } from "@/utils/constants";
const Backdrop = ({ backdropHandler, cuisines }) => {
  const ctx = useContext(RatingContext);
  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.modal}>
          <div className={classes.modaltitle}>
            <h2>Filters</h2>
            <div
              onClick={() => {
                backdropHandler(false);
              }}
            >
              <Cross></Cross>
            </div>
          </div>
          <article className={classes.article}>
            <section className={classes.left}>
              <div
                className={`${classes.leftitems} ${
                  ctx.activeFilter === "sortby" ? classes.active : ""
                }`}
                onClick={() => {
                  ctx.activeFilterHandler("sortby");
                }}
              >
                Sort By
              </div>
              <div
                className={`${classes.leftitems} ${
                  ctx.activeFilter === "cuisines" ? classes.active : ""
                }`}
                onClick={() => {
                  ctx.activeFilterHandler("cuisines");
                }}
              >
                Cuisines
              </div>
              <div
                className={`${classes.leftitems} ${
                  ctx.activeFilter === "rating" ? classes.active : ""
                }`}
                onClick={() => {
                  ctx.activeFilterHandler("rating");
                }}
              >
                Rating
              </div>
              <div
                className={`${classes.leftitems} ${
                  ctx.activeFilter === "cpp" ? classes.active : ""
                }`}
                onClick={() => {
                  ctx.activeFilterHandler("cpp");
                }}
              >
                Cost/Person
              </div>
            </section>
            <section className={classes.right}>
              <Filters cuisines={cuisines}></Filters>
            </section>
          </article>
          <footer className={classes.footer}>
            <div></div>
            <div className={classes.funcButtons}>
              <p
                onClick={() => {
                  location.reload();
                }}
              >
                Clear All
              </p>
              <button
                type="button"
                onClick={() => {
                  backdropHandler(false);
                  ctx.setApply(true);
                }}
              >
                Apply
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Backdrop;
