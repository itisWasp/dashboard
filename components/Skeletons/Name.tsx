import React from "react";

type Props = {};

const NameSkeleton = (props: Props) => {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
        <div className="flex flex-col space-y-3">
          <div className="h-6 bg-gray-300 rounded-md w-36 "></div>
        </div>
      </div>
    </>
  );
};

export default NameSkeleton;
