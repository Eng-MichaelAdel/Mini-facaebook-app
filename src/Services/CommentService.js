import axios from "axios";
import { header } from "framer-motion/client";

const BaseURL = "https://linked-posts.routemisr.com/";

export default function handleCommentAPI(commentContent, postId) {
return axios.post(BaseURL + "comments", {
        content: commentContent,
        post: postId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        }
      }
)}

export async function handleDeleteCommentAPI(CommentId) {
  try {
    const { data } = await axios.delete(BaseURL + "comments/" + CommentId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function handleEditingCommentAPI(CommentId , commentContent) {
  try {
    const { data } = await axios.put(
      BaseURL + "comments/" + CommentId,
      {
        content: commentContent,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
}
