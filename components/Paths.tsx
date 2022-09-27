import React from "react";
import Image from "next/image";
import paths from "../Assets/paths.png";

type Props = {};

const Paths = (props: Props) => {
  return (
    <div>
      {" "}
      <Image src={paths} alt="mockup" />
    </div>
  );
};

export default Paths;
