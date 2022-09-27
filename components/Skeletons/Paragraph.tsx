import React from "react";

type Props = {};

const Paragraph = (props: Props) => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="h-6 bg-gray-300 rounded-md w-50 "></div>
        <div className="h-6 bg-gray-300 rounded-md w-50 "></div>
        <div className="h-6 bg-gray-300 rounded-md w-50 "></div>
        <div className="w-24 h-6 bg-gray-300 rounded-md "></div>
      </div>
    </>
  );
};

export default Paragraph;
