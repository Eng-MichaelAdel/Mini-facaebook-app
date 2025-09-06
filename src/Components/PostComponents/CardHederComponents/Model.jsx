import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import React, { useContext, useState } from "react";
import { handleDeleteCommentAPI } from "../../../Services/CommentService";
import { handleDeletePostAPI } from "../../../Services/postsServices";
import { queryclient } from "../../../App";
import { SwitchingPages } from "../../../Contexts/SwitchingPages";
import { useNavigate } from "react-router-dom";

export default function Model({ post, comment, isOpen, onOpenChange }) {
  const [isDeleting, setisDeleting] = useState(false);
  const { isFeedPage, isPostDetailsPage } = useContext(SwitchingPages);
  const Navigate = useNavigate();

  async function handleDeleteComment(onClose) {
    setisDeleting(true);
    const response = await handleDeleteCommentAPI(comment._id);
    if (response.message == "success") {
      if (isFeedPage) {
        await queryclient.invalidateQueries(["getAllPosts"]);
      } else if (isPostDetailsPage) {
        await queryclient.invalidateQueries(["getPostDetails"]);
      }
      setisDeleting(false);
      onClose();
      addToast({
        title: "Comment Deleted Successfuly",
        timeout: 2000,
        color: "success",
      });
    }
  }

  async function handleDeletePost(onClose) {
    setisDeleting(true);
    const response = await handleDeletePostAPI(post._id);
    if (response.message == "success") {
      if (isFeedPage) {
        await queryclient.invalidateQueries(["getAllPosts"]);
      } else if (isPostDetailsPage) {
        Navigate("/");
        await queryclient.invalidateQueries(["getAllPosts"]);
      }
      setisDeleting(false);
      onClose();
      addToast({
        title: "Post Deleted Successfuly",
        timeout: 2000,
        color: "success",
      });
    }
  }

  function HandleDeleteComponent(onClose) {
    if (post) {
      handleDeletePost(onClose);
    }
    if (comment) {
      handleDeleteComment(onClose);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Delete {comment && "Comment"} {post && "post"}
              </ModalHeader>
              <ModalBody>
                <p>
                  are you sure you want to delete the {comment && "Comment"} {post && "post"} ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button disabled={isDeleting} color='default' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isDeleting}
                  onPress={() => {
                    HandleDeleteComponent(onClose);
                  }}
                  color='danger'>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
