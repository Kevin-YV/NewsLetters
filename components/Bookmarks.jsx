import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function Bookmarks() {
  // Initializing constants

  const accounts = useSelector((state) => state.accounts.value);
  const [name, setName] = useState("");
  const [str, setStr] = useState("");
  const [newsData, setNewsData] = useState([]);
  const dispatch = useDispatch();

  // Checking wheter or not a user is logged in and setting newsData accordingly

  useEffect(() => {
    if (name === "") {
      setStr("Log In to access bookmarks");

      const nameMap = accounts.map((el) => {
        setInterval(() => {
          el.isLoggedin ? setName(el.name) : "";
        }, 500);
      });
    } else {
      const books = accounts.map((el) => {
        name === el.name ? setNewsData(el.bookmarks) : "";
      });
      newsData.length === 0 ? setStr("No bookmarks yet") : setStr("");
    }
  });

  const articles = newsData.map((data, i) => {
    return <NewsCard key={i} {...data} />;
  });

  return (
    <>
      <div
        className={styles.imgContainer}
        style={{ height: "300px", width: "100%" }}
      >
        <img className={styles.img} src="newsBanner.png" alt="" />
      </div>
      <div className={styles.cardsContainer}>
        <h1
          style={{
            color: "var(--md-sys-color-on-surface)",
            display: str === "" ? "none" : "flex",
          }}
        >
          {str}
        </h1>
        {articles}
      </div>
    </>
  );
}
