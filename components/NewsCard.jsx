import React, { useEffect, useState } from "react";
import styles from "@/styles/NewCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark,
  addLikes,
  removeLikes,
} from "@/pages/reducer/accounts";

import Link from "next/link";

// Importing material 2 elements

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { VisibilityOff } from "@mui/icons-material";

export default function NewsCard(props) {
  const { author, source, title, description, urlToImage, publishedAt, url } =
    props;

  // Initializing constants
  const date = new Date(publishedAt);
  const formattedDate = `${String(date.getDate()).padStart(2, "O")}/${String(
    date.getMonth()
  ).padStart(2, "0")}/${date.getFullYear()}`;

  const accounts = useSelector((state) => state.accounts.value);
  const [name, setName] = useState("");
  const [book, setBook] = useState(false);
  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentURL = String(window.location.href);
  const dispatch = useDispatch();

  // Checking if a user is logged in

  useEffect(() => {
    const nameMap = accounts.map((el) => {
      setInterval(() => {
        el.isLoggedin ? setName(el.name) : "";
      }, 500);
    });
  });

  // Adding/removing bookmarks from the redux store

  const handleAddBookmark = (e) => {
    e.preventDefault();
    setBook(true);
    dispatch(
      addBookmark({
        name: name,
        bookmarks: {
          author,
          source,
          title,
          description,
          urlToImage,
          publishedAt,
          url,
        },
      })
    );
  };
  const handleRemoveBookmark = (e) => {
    e.preventDefault();
    setBook(false);
    dispatch(
      removeBookmark({
        name: name,
        bookmarks: {
          author,
          source,
          title,
          description,
          urlToImage,
          publishedAt,
          url,
        },
      })
    );
  };

  // Adding/removing likes from the redux store

  const handleAddLikes = (e) => {
    e.preventDefault();
    setLike(true);
    dispatch(
      addLikes({
        name: name,
        likes: {
          author,
          source,
          title,
          description,
          urlToImage,
          publishedAt,
          url,
        },
      })
    );
  };
  const handleRemoveLikes = (e) => {
    e.preventDefault();
    setLike(false);
    dispatch(
      removeLikes({
        name: name,
        likes: {
          author,
          source,
          title,
          description,
          urlToImage,
          publishedAt,
          url,
        },
      })
    );
  };

  // Handling the dropdown menu for more options

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className={styles.card}>
        <Link className={styles.redirect} href={url}>
          <div className="img" style={{ height: "200px" }}>
            {" "}
            <img
              className={styles.img}
              width="375vw"
              src={urlToImage}
              alt={title}
            />
          </div>
        </Link>

        <div className={styles.text}>
          <div className="title">
            <Link className={styles.redirect} href={url}>
              <h2 className={styles.headline}>{title}</h2>
            </Link>

            <div className={styles.source}>
              <h4 style={{ width: "235px" }}>{source.name}</h4>
              <h4>{formattedDate}</h4>
            </div>
          </div>
          <div className={styles.description}>{description}</div>
          <div className={styles.info}>
            <h4 className={styles.author} style={{ width: "235px" }}>
              By: {author}
            </h4>
            <div className={styles.icons}>
              {/* Like button */}

              <md-icon-button
                onClick={(e) => {
                  if (currentURL.includes("likes")) {
                    handleRemoveLikes(e);
                  } else {
                    if (!like) {
                      handleAddLikes(e);
                    } else {
                      handleRemoveLikes(e);
                    }
                  }
                }}
              >
                <md-icon>
                  <span
                    class="material-symbols-rounded"
                    style={{ cursor: "pointer" }}
                  >
                    {like || currentURL.includes("likes")
                      ? "heart_check"
                      : "favorite"}
                  </span>
                </md-icon>
              </md-icon-button>

              {/* Share button */}

              <md-icon-button>
                <md-icon>
                  <span class="material-symbols-outlined">share</span>
                </md-icon>
              </md-icon-button>

              {/* Dropdown menu */}

              <span>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                    keepMounted: true,
                    disablePortal: true,
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {/* Bookmark button */}

                  <MenuItem
                    onClick={(e) => {
                      if (currentURL.includes("bookmarks")) {
                        handleRemoveBookmark(e);
                      } else {
                        if (!book) {
                          handleAddBookmark(e);
                        } else {
                          handleRemoveBookmark(e);
                        }
                      }

                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <md-icon>
                        <span
                          class="material-symbols-rounded"
                          style={{ cursor: "pointer" }}
                        >
                          {book || currentURL.includes("bookmarks")
                            ? "bookmark_remove"
                            : "bookmark_add"}
                        </span>
                      </md-icon>
                    </ListItemIcon>
                    <ListItemText>Bookmark</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {/* Hide button, not functional at the moment */}

                    <ListItemIcon>
                      <VisibilityOff />
                    </ListItemIcon>
                    <ListItemText>Hide</ListItemText>
                  </MenuItem>
                </Menu>

                <md-icon-button
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <md-icon id="usage-anchor">
                    <span class="material-symbols-outlined">more_vert</span>
                  </md-icon>
                </md-icon-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
