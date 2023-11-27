import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import styles from "@/styles/Home.module.css";

//// Not active yet
export default function Trending() {
  const APIKey1 = "3740b00674284aedbc06608a4736eb03";
  const APIKey2 = "a14ea5887e1e443eadf762e469fe057a";
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?pageSize=15&language=en&sortBy=publishedAt&apiKey=3740b00674284aedbc06608a4736eb03"
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.articles);
      });
  }, []);

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
      <div className={styles.cardsContainer}>{articles}</div>
    </>
  );
}
