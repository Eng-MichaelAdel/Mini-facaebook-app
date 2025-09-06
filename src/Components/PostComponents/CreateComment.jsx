import React, { useContext, useState } from "react";
import handleCommentAPI from "../../Services/CommentService";
import { Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { queryclient } from "../../App";
import { SwitchingPages } from "../../Contexts/SwitchingPages";

export default function CreateComment({ postId ,postDetails}) {
  const [commentContent, setcommentContent] = useState("");
  const { isFeedPage, isPostDetailsPage} = useContext(SwitchingPages);
  

  const { mutate: handleAddComment, isPending } = useMutation({
    mutationFn: () => handleCommentAPI(commentContent, postId),
    onSuccess: async () => {
      if (isFeedPage) {
        await queryclient.invalidateQueries(["getAllPosts"]);
        console.log("comment done");
        setcommentContent("");
      }
      if (isPostDetailsPage) {
        await queryclient.invalidateQueries(["getPostDetails"]);
        console.log("comment done");
        setcommentContent("");
      }
    },
    onError: (error) => console.log(error.message),
  });


  return (
    <div className='rounded-2xl my-3 relative'>
      <textarea value={commentContent} onChange={(e) => setcommentContent(e.target.value)} className='PostTextarea relative' placeholder='Comment...'></textarea>
      <Button isLoading={isPending} isDisabled={commentContent.trim().length < 2} onPress={handleAddComment} className='bg-blue-600 text-white border-1 border-blue-700 absolute bottom-2 right-2'>
        Comment
      </Button>
    </div>
  );
}
