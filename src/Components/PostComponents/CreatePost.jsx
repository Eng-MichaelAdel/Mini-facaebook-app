import { addToast, Spinner } from "@heroui/react";
import React from "react";
import { useState } from "react";
import { handleCreatPostAPI } from "../../Services/postsServices";

export default function CreatePost({ reloadAllPosts }) {
  const [showForm, setshowForm] = useState(false);
  const [captionContent, setcaptionContent] = useState("");
  const [imageInfo, setimageInfo] = useState(null);
  const [imagePreview, setimagePreview] = useState("");
  const [isPostingComment, setisPostingComment] = useState(false);

  async function handleCreatePostSubmitting(e) {
    e.preventDefault();
    if (captionContent.trim() == "" && imageInfo == null) {
      return;
    }
    setisPostingComment(true);
    const postFormData = new FormData();
    if (captionContent.trim()) {
      postFormData.append("body", captionContent);
    }
    if (imageInfo) {
      postFormData.append("image", imageInfo);
    }
    const response = await handleCreatPostAPI(postFormData);
    await reloadAllPosts();
    handleRemveImagePreview();
    setcaptionContent("");
    setisPostingComment(false);
    setshowForm(false);
    addToast({
      title: "Post Created Successfully",
      timeout: 2000,
      color: "success",
    });
  }

  function handleImageInput(e) {
    setimageInfo(e.target.files[0]);
    setimagePreview(URL.createObjectURL(e.target.files[0]));
  }

  function handleRemveImagePreview() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setimageInfo(null);
    setimagePreview("");
    document.querySelector("#imageID").value = null;
  }

  return (
    <div className='bg-white max-w-3xl mx-auto rounded-lg shadow-roundedmd p-6 mb-6 mt-4 '>
      {showForm ? (
        <form onSubmit={handleCreatePostSubmitting}>
          {/* Caption Input */}
          <div className='flex flex-col justify-center items-center mb-3'>
            <textarea
              value={captionContent}
              onChange={(e) => setcaptionContent(e.target.value)}
              autoFocus
              className='w-full rounded-lg px-3 py-3 resize-none border-1 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-0'
              placeholder='What is in your mind?'
              rows={3}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className=' mb-3 relative'>
              <img className='w-full max-h-80 object-cover rounded-xl' src={imagePreview} alt='Preview' />
              <button onClick={handleRemveImagePreview} className='absolute top-5 right-3' type='button'>
                <span className='bg-red-400 size-7 flex justify-center items-center rounded-full p-4 hover:bg-red-600 transition duration-200'>
                  <i className='fa-solid fa-xmark text-md text-white'></i>
                </span>
              </button>
            </div>
          )}

          {/* Error Message */}
          {false && (
            <div className='bg-red-100 rounded-lg p-2 border-1 border-red-500/25 '>
              <h6 className='text-red-600'>there is error here ....</h6>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex justify-between items-center mt-3 px-2'>
            {/* Image Upload Button */}
            <label className='cursor-pointer text-gray-600 text-md font-bold hover:text-blue-600 transition duration-150 w-fit'>
              <input id='imageID' onChange={handleImageInput} type='file' accept='image/*' className='hidden' />
              <div className='flex justify-center items-center'>
                <i className='fa-solid fa-image text-2xl me-1'></i>
                <span>Photo</span>
              </div>
            </label>

            {/* Submitting and cancel Button */}
            <div className='flex justify-center items-center gap-x-2'>
              <button type='button' onClick={() => setshowForm(false)} className='px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200 disabled:opacity-50'>
                Cancel
              </button>

              <button
                disabled={(captionContent.trim() == "" && imageInfo == null) || isPostingComment}
                className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50  disabled:cursor-not-allowed transition duration-200'
                type='submit'>
                <span className='flex justify-center items-center gap-x-2'>
                  {isPostingComment ? (
                    <>
                      <Spinner size='sm' color='white' variant='simple' /> <span>posting..</span>
                    </>
                  ) : (
                    "Post"
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button onClick={() => setshowForm(true)} className='w-full text-left bg-gray-100  text-gray-500 hover:text-gray-700 transition duration-200 px-4 py-3 rounded-lg'>
          What's on your mind? Share a post...
        </button>
      )}
    </div>
  );
}
