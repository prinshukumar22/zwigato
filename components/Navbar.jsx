"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvider();
  }, []);

  if (!session) {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Zwigato
        </Link>
        <Link href="/">Investor relations</Link>
        <Link href="/">Add Restaurent</Link>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className={styles.button}
            >
              Log in
            </button>
          ))}
      </div>
    );
  }

  if (session) {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Zwigato
        </Link>
        <Link href="/">
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            alt="profile"
            className={styles.image}
          ></Image>
        </Link>
        <button type="button" onClick={signOut} className={styles.button}>
          Sign Out
        </button>
      </div>
    );
  }
};

export default Navbar;
