import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleSinglePostAPI } from "../Services/postsServices";
import Post from "../Components/Post";
import LoadingPage from "./LoadingPage";
import { useQuery } from "@tanstack/react-query";

export default function PostDetailsPage() {
  const { id } = useParams();

  const { data: postData } = useQuery({
    queryKey: ["getPostDetails"],
    queryFn: () => handleSinglePostAPI(id),
    select: (data) => data.data.post,
  });

  return <>{postData ? <Post post={postData} postDetails={true} /> : <LoadingPage />}</>;
}
