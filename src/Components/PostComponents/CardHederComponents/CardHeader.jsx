import React, { useState } from "react";
import userPhoto from "/src/assets/user-photo.jpeg";
import { Button, Spinner, useDisclosure } from "@heroui/react";
import Dropdown from "./Dropdown";
import Model from "./Model";
import { handleEditingCommentAPI } from "../../../Services/CommentService";
import { queryclient } from "../../../App";


export default function CardHeader({ avatar, headerName, headerTime, IsCommentHeader, post, comment, postId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditing, setisEditing] = useState(false);
  const [commentContent, setcommentContent] = useState(comment?.content);
  const [isLoadingComment, setisLoadingComment] = useState(false);
  
  async function handleEditingComment() {
    setisLoadingComment(true);
    const response = await handleEditingCommentAPI(comment?._id, commentContent);
    if (response.message == "success") {
      await queryclient.invalidateQueries(["getAllPosts"])
      setisLoadingComment(false);
      setisEditing(false);
    }
  }
  return (
    <div className='flex justify-between items-start py-2'>
      <div className='flex flex-row w-full'>
        <img
          onError={(e) => {
            e.target.src = userPhoto;
          }}
          className=' rounded-full w-10 h-10 mr-3'
          src={avatar}
          alt=''
        />
        <div className={[IsCommentHeader && "border-1 rounded-lg p-2 pt-0 border-gray-600/30 mb-2 bg-gray-100", IsCommentHeader && isEditing && "grow"].filter(Boolean).join(" ")}>
          <h3 className='text-md font-semibold '>{headerName}</h3>
          <p className='text-xs text-gray-500'>{headerTime}</p>
          {IsCommentHeader &&
            (isEditing ? (
              <div className='relative'>
                <input value={commentContent} onChange={(e) => setcommentContent(e.target.value)} autoFocus className='bg-white w-full outline-0 ps-2 py-1 my-2 ' />
                <div className=' rounded-md absolute end-2 top-3 flex gap-1'>
                  <button onClick={()=>setisEditing(false)} className='block w-fit'>
                    <i class='fa-solid fa-xmark text-red-100 text-md hover:text-red-600 transition duration-200 '></i>
                  </button>
                  <button onClick={handleEditingComment} className='block w-fit font-bold'>
                    {isLoadingComment ? <Spinner size='sm' variant='spinner' /> : <i class='fa-regular fa-paper-plane  text-gray-500 text-sm hover:text-blue-700 transition duration-200'></i>}
                  </button>
                </div>
              </div>
            ) : (
              <p className='text-sm text-gray-700 whitespace-pre-wrap break-words mt-1'>{comment.content}</p>
            ))}
        </div>
      </div>
      <Dropdown post={post} comment={comment} postId={postId} onOpen={onOpen} setisEditing={setisEditing} />
      <Model post={post} comment={comment} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
