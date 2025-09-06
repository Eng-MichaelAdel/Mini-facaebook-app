import { Spinner } from "@heroui/react";
import React from "react";

export default function () {
  return (
    <>
      <div className='max-w-3xl h-[70vh] flex justify-center items-center mx-auto h- text-center'>
        <Spinner size='lg' />
      </div>
    </>
  );
}
