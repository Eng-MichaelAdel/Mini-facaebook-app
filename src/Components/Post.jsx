import React, { useEffect, useState } from "react";
import Comment from "./PostComponents/Comment";
import CardHeader from "./PostComponents/CardHederComponents/CardHeader";
import PostBody from "./PostComponents/PostBody";
import PostFooter from "./PostComponents/PostFooter";
import PostAction from "./PostComponents/PostAction";
import { Button } from "@heroui/react";
import CreateComment from "./PostComponents/CreateComment";

export default function Post({ post, commentsLimit }) {
  const [visibleComments, setvisibleComments] = useState(2);
  const [isLoading, setisLoading] = useState(false)

  function handleLoadMoreComments() {
    setisLoading(true);
    setvisibleComments(visibleComments * 2);
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  }

  return (
    <div className='bg-white max-w-3xl mx-auto rounded-md shadow-roundedmd h-auto py-3 px-3 my-5'>

      <CardHeader avatar={post.user.photo} headerName={post.user.name} headerTime={post.createdAt} post={post}/>
      <PostBody caption={post.body} image={post.image} />
      <PostFooter noOfComments={post.comments.length} />
      <PostAction postID={post.id} />
      <CreateComment postId={post.id} />

      <div className='flex flex-col overflow-auto'>
        {post.comments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, commentsLimit ?? visibleComments)
          .map((comment) => (
            <Comment key={comment._id} comment={comment}  postId={post.user._id} />
          ))}
      </div>

      {post.comments.length > visibleComments && !commentsLimit && (
        <Button onPress={handleLoadMoreComments} className='mx-auto block bg-blue-200' variant='faded'>
          Load more Comments
        </Button>
      )}
    </div>
  );
}
