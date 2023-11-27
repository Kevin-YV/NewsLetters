import React from "react";
import Bookmarks from "@/components/Bookmarks";

export default function index() {
  return (
    <Bookmarks
      onLoad={(e) => {
        e.preventDefault();
      }}
      style={{ width: "100%" }}
    />
  );
}
