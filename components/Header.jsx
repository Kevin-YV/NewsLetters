import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  createAccount,
  deleteAccount,
  logout,
} from "@/pages/reducer/accounts";

import Link from "next/link";
import styles from "../styles/Header.module.css";

// Importing material 3 elements

import "@material/web/button/text-button.js";
import "@material/web/button/filled-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/icon/icon.js";

// Importing material 2 elements

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export default function Header({ darkMode, setDarkMode }) {
  // Initializing constants
  const [windowDimensions, setWindowDimensions] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSign, setOpenSign] = React.useState(false);
  const [name, setName] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [displayName, setDisplayName] = useState("");

  // Fetching accounts reducer data

  const accounts = useSelector((state) => state.accounts.value);
  const dispatch = useDispatch();
  // Getting the viewport dimentions to aid with responsive design
  useEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
    setWindowDimensions(getWindowDimensions());
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ref = useRef(null);

  // Opening and closing the drawer on the left, activated by the hamburger menu
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Changing and storing the website theme on the local storage
  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };
  // Login Overlay
  //// Opening and closing the login dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitLog = (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };

  //// Checking for login validation, once validated, we set displayName which will later be used to check whether a user is logged in or not

  useEffect(() => {
    const nameMap = accounts.map((el) => {
      setInterval(() => {
        el.isLoggedin ? setDisplayName(el.name) : "";
      }, 500);
    });
  });

  // Sing up Overlay
  //// Opening and closing the sing u dialog

  const handleClickOpenSign = () => {
    setOpenSign(true);
  };

  const handleCloseSign = () => {
    setOpenSign(false);
  };

  //// Creating new account and loggin in to said account at the same time

  const handleSubmitSign = (e) => {
    e.preventDefault();
    dispatch(
      createAccount({
        name: name,
        username: signUpUsername,
        password: signUpPassword,
        isLoggedin: true,
        bookmarks: [],
        likes: [],
      })
    );
    setDisplayName(name);
  };

  // Log out button
  // Reinitialize the username, the password and the displayName to empty strings then refreshes the page
  const handleLogOut = (e) => {
    e.preventDefault();

    setPassword("");
    setUsername("");
    dispatch(logout());
    setDisplayName("");
    window.location.reload(false);
  };

  // Detele account function, to be moved to the accounts page
  const handleDeleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteAccount(username));
    window.location.reload(false);
  };

  // Showing and hiding the password from the login and sign up dialogs
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // the media querries in the css stopped working for some elements after implementing the persistGate hence why some inline styles have some conditions related to window.innerWidth
  // Sometimes inline styles are necessary to override the default theme provided by the element library

  const list = (anchor) => (
    // Drawer Content

    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: 1,
        backgroundColor: "var(--md-sys-color-surface)",
        overflow: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Drawer Logo */}

      <List className={styles.list}>
        <Link
          href="./"
          style={{
            textDecoration: "none",
            color: "var(--md-sys-color-on-surface-variant)",
          }}
        >
          <ListItem
            className={styles.accNav}
            style={{
              display: "flex",
              justifyContent: window.innerWidth <= 840 ? "center" : "",
            }}
          >
            <h1 className={styles.title}>
              <FontAwesomeIcon icon={faNewspaper} /> News
            </h1>
          </ListItem>
        </Link>

        {/* Drawer Account Button */}
        {/* Will be hidded unless you're logged in */}
        <ListItem
          className={styles.accNav}
          style={{
            display: displayName !== "" ? "flex" : "none",
            color: "var(--md-sys-color-on-primary-container)",
            justifyContent: window.innerWidth <= 840 ? "center" : "",
          }}
        >
          <div className={styles.loginDrawer}>
            <h2>Welcome {displayName}</h2>
          </div>
        </ListItem>
        {/* <ListItem
          key="Profile"
          className={styles.accNav}
          style={{
            display: displayName !== "" ? "flex" : "none",
            justifyContent: window.innerWidth <= 840 ? "center" : "",
          }}
        >
          <md-text-button
            className={styles.drawerTextButton}
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            <md-icon slot="icon">
              <span class="material-symbols-rounded">account_circle</span>
            </md-icon>
            Account
          </md-text-button>
        </ListItem> */}

        {/* Drawer Log In and Sign up buttons will be hidden when logged in OR when window.innerWidth > 840px */}
        {/* Drawer Log In */}

        <ListItem>
          <div className={styles.loginDrawer}>
            <md-outlined-button
              onClick={handleClickOpen}
              style={{
                marginInline: "10px",
                display: displayName !== "" ? "none" : "inline-flex",
              }}
            >
              Login
            </md-outlined-button>

            {/* Log In Dialog, can be opened by both the Drawer Log In button and the Nav Log In button */}

            <Dialog
              open={open}
              onClose={(e) => {
                handleClose();
              }}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "28px",
                  padding: "25px",
                  bgcolor: "var(--md-sys-color-surface-container-high);",
                },
              }}
            >
              <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "var(--md-sys-color-on-surface)",
                  fontWeight: "400px",
                  fontSize: "24px",
                  letterSpacing: "0px",
                  lineHeight: "32px",
                }}
              >
                Log In
              </DialogTitle>
              <Divider
                sx={{
                  backgroundColor: "var(--md-sys-color-on-surface-variant)",
                }}
              />
              <DialogContent sx={{ paddingInline: "0px" }}>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onSubmit={(e) => handleSubmitLog(e)}
                >
                  <md-outlined-text-field
                    label="Username"
                    style={{ marginBottom: "20px" }}
                    onInput={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                    supporting-text="*required"
                  />
                  <md-outlined-text-field
                    label="Password"
                    onInput={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    supporting-text="*required"
                    type={showPassword ? "text" : "password"}
                    style={{ marginBottom: "20px" }}
                  >
                    <md-icon-button
                      toggle
                      slot="trailing-icon"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      <md-icon>
                        <span
                          class="material-symbols-rounded"
                          onMouseDown={handleMouseDownPassword}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </md-icon>
                    </md-icon-button>
                  </md-outlined-text-field>
                  <Divider
                    sx={{
                      backgroundColor: "var(--md-sys-color-on-surface-variant)",
                    }}
                  />
                  <div className={styles.loginBtns}>
                    <md-text-button
                      form="form-id"
                      value="cancel"
                      type="reset"
                      onClick={handleClose}
                      style={{ marginInline: "10px" }}
                    >
                      Cancel
                    </md-text-button>
                    <md-filled-button
                      form="form-id"
                      value="ok"
                      type="submit"
                      onClick={(e) => {
                        handleSubmitLog(e);
                        handleClose();
                      }}
                    >
                      Login
                    </md-filled-button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Drawer Sign Up */}

            <md-filled-button
              onClick={handleClickOpenSign}
              style={{ display: displayName !== "" ? "none" : "flex" }}
            >
              Sign Up
            </md-filled-button>

            {/* Sign Up Dialog, can be opened by both the Drawer Sign Up button and the Nav Sign Up button */}

            <Dialog
              open={openSign}
              onClose={handleCloseSign}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "28px",
                  padding: "25px",
                  bgcolor: "var(--md-sys-color-surface-container-high);",
                },
              }}
            >
              <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "var(--md-sys-color-on-surface)",
                  fontWeight: "400px",
                  fontSize: "24px",
                  letterSpacing: "0px",
                  lineHeight: "32px",
                }}
              >
                Sign Up
              </DialogTitle>
              <Divider
                sx={{
                  backgroundColor: "var(--md-sys-color-on-surface-variant)",
                }}
              />
              <DialogContent sx={{ paddingInline: "0px" }}>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onSubmit={(e) => handleSubmitSign(e)}
                >
                  <md-outlined-text-field
                    label="First Name"
                    style={{ marginBottom: "20px" }}
                    required
                    supporting-text="*required"
                    onInput={(e) => setName(e.target.value)}
                  />
                  <md-outlined-text-field
                    label="Create Username"
                    style={{ marginBottom: "20px" }}
                    required
                    supporting-text="*required"
                    onInput={(e) => setSignUpUsername(e.target.value)}
                  />
                  <md-outlined-text-field
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    required
                    supporting-text="*required"
                    style={{ marginBottom: "20px" }}
                    onInput={(e) => setSignUpPassword(e.target.value)}
                  >
                    {" "}
                    <md-icon-button
                      toggle
                      slot="trailing-icon"
                      onClick={() => {
                        handleClickShowPassword();
                      }}
                    >
                      <md-icon>
                        <span
                          class="material-symbols-rounded"
                          onMouseDown={handleMouseDownPassword}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </md-icon>
                    </md-icon-button>
                  </md-outlined-text-field>{" "}
                  <Divider
                    sx={{
                      backgroundColor: "var(--md-sys-color-on-surface-variant)",
                    }}
                  />
                  <div className={styles.loginBtns}>
                    <md-text-button
                      form="form-id"
                      value="cancel"
                      type="reset"
                      onClick={handleCloseSign}
                      style={{ marginInline: "10px" }}
                    >
                      Cancel
                    </md-text-button>
                    <md-filled-button
                      form="form-id"
                      value="ok"
                      type="submit"
                      onClick={(e) => {
                        handleCloseSign();
                        handleSubmitSign(e);
                      }}
                    >
                      Sign Up
                    </md-filled-button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </ListItem>

        {/* Log Out button, will be hidden when not logged in */}

        <ListItem
          className={styles.accNav}
          style={{
            display: displayName !== "" ? "flex" : "none",
            justifyContent: window.innerWidth <= 840 ? "center" : "",
          }}
        >
          <md-filled-button
            style={{ display: displayName !== "" ? "flex" : "none" }}
            onClick={handleLogOut}
          >
            Log Out
          </md-filled-button>
        </ListItem>
        <Divider
          style={{ backgroundColor: "var(--md-ref-palette-primary95)" }}
        />

        {/* Drawer Trending Button */}
        {/* 
        <ListItem
          key="Trending"
          className={styles.trending}
          style={{ display: window.innerWidth <= 840 ? "flex" : "none" }}
        >
          <Link href="/trending">
            <md-text-button
              style={{ color: "var(--md-sys-color-on-primary-container)" }}
            >
              <md-icon slot="icon">
                <span class="material-symbols-rounded">trending_up</span>
              </md-icon>
              Trending
            </md-text-button>
          </Link>
        </ListItem> */}

        {/* Drawer Bookmarks Button */}

        <Link
          href="./bookmarks"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem key="Bookmarks">
            <md-text-button>
              <md-icon slot="icon">
                <span class="material-symbols-rounded">bookmark</span>
              </md-icon>
              Bookmarks
            </md-text-button>
          </ListItem>
        </Link>
        <Link href="./likes" style={{ textDecoration: "none", color: "black" }}>
          {/* Drawer Favorites Button */}

          <ListItem key="Likes">
            <md-text-button>
              <md-icon slot="icon">
                <span class="material-symbols-rounded">favorite</span>
              </md-icon>
              Favorites
            </md-text-button>
          </ListItem>
        </Link>
      </List>
      <Divider style={{ backgroundColor: "var(--md-ref-palette-primary95)" }} />

      <List className={styles.bottom} style={{ position: "absolute" }}>
        {/* Drawer Theme Button */}

        <ListItem key="dark" disablePadding>
          <md-icon-button toggle onClick={toggleTheme}>
            <md-icon>
              <span
                class="material-symbols-rounded"
                style={{ cursor: "pointer" }}
              >
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </md-icon>
          </md-icon-button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <div className={styles.container} onScroll={toggleDrawer("left", false)}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />

        {/* Nav Bar Content Left */}
        <div
          className={styles.nav}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {/* Logo */}
          <div
            className={styles.logo}
            style={{
              display:
                isFocused && windowDimensions.width <= 550 ? "none" : "flex",
            }}
          >
            <md-icon-button
              onClick={toggleDrawer("left", true)}
              style={{ cursor: "pointer", padding: "10px" }}
            >
              <md-icon
                style={{ color: "var(--md-sys-color-on-primary-container)" }}
              >
                <span class="material-symbols-rounded">menu</span>
              </md-icon>
            </md-icon-button>
            <Link href="./" style={{ textDecoration: "none", color: "black" }}>
              <h1 className={styles.title}>
                <FontAwesomeIcon icon={faNewspaper} /> News
              </h1>
            </Link>
          </div>
          {/* Search Bar, not currently operational */}
          {/* <div
            className={styles.search}
            style={{
              width: isFocused && windowDimensions.width <= 550 ? "100%" : "",
            }}
          >
            <md-outlined-text-field
              label="Search"
              type="text"
              focus={isFocused}
              //   onInput={(e) => {
              //     console.log(e.target.value);
              //   }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                width: isFocused && windowDimensions.width <= 550 ? "100%" : "",
              }}
            >
              <md-icon-button toggle slot="trailing-icon">
                <md-icon id="search">
                  <span class="material-symbols-rounded">search</span>
                </md-icon>
              </md-icon-button>
            </md-outlined-text-field>
          </div> */}

          {/* Trending Nav Button */}

          {/* <div className={styles.trendingNav}>
            <Link href="/trending">
              <md-text-button>Trending</md-text-button>
            </Link>
          </div> */}
        </div>

        {/* Nav Login button*/}

        <div className={styles.login}>
          <h1
            style={{
              display: displayName !== "" ? "flex" : "none",
              color: "var(--md-sys-color-on-primary-container)",
            }}
          >
            Welcome {displayName}
          </h1>
          <div style={{ display: displayName !== "" ? "none" : "flex" }}>
            <md-outlined-button
              onClick={handleClickOpen}
              style={{ marginInline: "10px" }}
            >
              Login
            </md-outlined-button>
            {/* Nav Sign Up button*/}
            <md-filled-button onClick={handleClickOpenSign}>
              Sign Up
            </md-filled-button>{" "}
          </div>
        </div>
      </div>

      {/* Drawer Left */}
      <div>
        <React.Fragment key="left">
          <SwipeableDrawer
            anchor="left"
            open={state["left"]}
            onScroll={toggleDrawer("left", false)}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    </>
  );
}
