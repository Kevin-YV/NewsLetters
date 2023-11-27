import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import styles from "@/styles/Home.module.css";
// import { goToPage } from "@/pages/reducer/pagination";
import { useDispatch, useSelector } from "react-redux";
// Importing material 2 elements
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// Creating custom theme so material 2 elements can adhere to material 3 color design

// const theme = createTheme({
//   palette: {
//     OnSurfaceContainer: {
//       main: "var(--md-sys-color-secondary-container)",
//       text: "var(--md-sys-color-on-secondary-container)",
//       contrastText: "var(--md-sys-color-on-secondary-container)",
//     },
//   },
// });

//// Don't know if this work yet, I, Pedro, reached the request limit for the NewsAPI, but in theory it should work exactly like the Home.jsx component

export default function Trending() {
  const APIKey1 = "3740b00674284aedbc06608a4736eb03";
  const APIKey2 = "a14ea5887e1e443eadf762e469fe057a";
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const URL = `https://newsapi.org/v2/top-headlines?pageSize=18&language=en&sortBy=publishedAt&apiKey=a14ea5887e1e443eadf762e469fe057a`;

  // Fetching new page

  // const handleFetch = (page) => {
  //   fetch(
  //     `https://newsapi.org/v2/top-headlines?pageSize=18&language=en&sortBy=publishedAt&apiKey=a14ea5887e1e443eadf762e469fe057a`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setNewsData(data.articles);
  //     });
  // };

  // const handlePageChange = (selectedObject) => {
  //   setPage(selectedObject);
  //   handleFetch(selectedObject);
  // };

  // const newPage = () => {
  //   dispatch(
  //     goToPage({
  //       page: page,
  //     })
  //   );
  // };

  // const handleChange = (event, value) => {
  //   setPage(value);
  //   newPage();
  //   handlePageChange(value);
  // };

  // Setting the data for rendering

  useEffect(() => {
    fetch(URL)
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
      {/* <ThemeProvider theme={theme}>
        <Stack spacing={3}>
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
            count={8}
            siblingCount={2}
            boundaryCount={0}
            page={page}
            color="OnSurfaceContainer"
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        </Stack>
      </ThemeProvider> */}
    </>
  );
}
