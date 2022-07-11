import React from "react";
import PostDetail from "./PostDetail/PostDetail";
import Navbar from "../../../Navbar/Navbar";
import "./PostDetailRender.scss";

const PostDetailRender = () => {
  return (
    <div className="GeneralContainer">
      <Navbar />   
      <PostDetail />
    </div>
  );
};

export default PostDetailRender;
