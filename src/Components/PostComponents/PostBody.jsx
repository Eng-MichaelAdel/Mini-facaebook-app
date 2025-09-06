import React from "react";

export default function ({caption , image}) {
  return (
    <>
      {caption && <p>{caption}</p>}
      {image && <img className='w-full h-100 object-cover mt-4' src={image} alt='' />}
    </>
  );
}
