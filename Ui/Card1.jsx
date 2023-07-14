import React from "react";
import styles from "./Card1.module.css";
import Link from "next/link";
const Card1 = ({ heading, desc, img, id }) => {
  return (
    <Link href={`/${id}`} className={styles.link}>
      <div className={styles.card}>
        <img src={img} alt="tasty food"></img>

        <div className={styles.desc}>
          <h2>{heading}</h2>
          <p>{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card1;
