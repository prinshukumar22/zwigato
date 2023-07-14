import React from "react";
import styles from "./Card2.module.css";
import Image from "next/image";
import Star from "@/utils/Star";
const Card2 = ({ data, uri }) => {
  const restData = data?.data;
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={`${uri}${restData.cloudinaryImageId}`}
          alt={`${restData.name}`}
          width={200}
          height={250}
          className={styles.imagein}
        ></Image>
        {restData?.aggregatedDiscountInfo?.header && (
          <p>{restData?.aggregatedDiscountInfo?.header}</p>
        )}
      </div>
      <div className={styles.description}>
        <p className={styles.title}>{restData?.name}</p>
        <p className={styles.rating}>
          <span>
            <span>{restData?.avgRating}</span>
            <Star></Star>
          </span>
        </p>
        <p className={styles.category}>{`${restData?.cuisines[0]}`}</p>
        <p className={styles.price}>{restData?.costForTwoString}</p>
        <p></p>
        <p className={styles.time}>{restData?.slaString}</p>
      </div>
    </div>
  );
};

export default Card2;
