"use client";
import Image from "next/image";
import Header from "@/containers/Header";
import Main from "@/containers/Main";
import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./main.module.css";
export default function Home() {
  const { data: session } = useSession();
  const [dummydata, setDummyData] = useState([
    {
      id: "online",
      heading: "Order Online",
      desc: "Stay home and order to your doorstep",
      img: "/assets/orderonline.avif",
    },
    {
      id: "dining",
      heading: "Dining",
      desc: "View the city's favourite dining venues",
      img: "/assets/dining.avif",
    },
    {
      id: "nightlife",
      heading: "Nightlife and Clubs",
      desc: "Explore the city's top nightlife outlets",
      img: "/assets/nightlife.avif",
    },
  ]);
  const [filteredData, setFilteredData] = useState([
    {
      id: "online",
      heading: "Order Online",
      desc: "Stay home and order to your doorstep",
      img: "/assets/orderonline.avif",
    },
    {
      id: "dining",
      heading: "Dining",
      desc: "View the city's favourite dining venues",
      img: "/assets/dining.avif",
    },
    {
      id: "nightlife",
      heading: "Nightlife and Clubs",
      desc: "Explore the city's top nightlife outlets",
      img: "/assets/nightlife.avif",
    },
  ]);
  return (
    <>
      <Header setFilteredData={setFilteredData} dummydata={dummydata}></Header>
      {session?.user && (
        <Main dummydata={dummydata} filteredData={filteredData}></Main>
      )}
      {!session?.user && (
        <div className={styles.heading}>
          <h1>Sign in to unlock more features!</h1>
        </div>
      )}
    </>
  );
}
