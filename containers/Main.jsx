"use client";
import React, { useState } from "react";
import styles from "./Main.module.css";
import Card1 from "@/Ui/Card1";
const Main = ({ dummydata, filteredData }) => {
  return (
    <main className={styles.main}>
      <section className={styles.con}>
        {filteredData.length > 0
          ? filteredData.map((item) => (
              <Card1
                key={item.id}
                heading={item.heading}
                desc={item.desc}
                img={item.img}
                id={item.id}
              ></Card1>
            ))
          : dummydata.map((item) => (
              <Card1
                key={item.id}
                heading={item.heading}
                desc={item.desc}
                img={item.img}
                id={item.id}
              ></Card1>
            ))}
      </section>
    </main>
  );
};

export default Main;
