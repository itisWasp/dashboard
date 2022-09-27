import React from "react";
import Image from "next/image";
import Router from "next/router";
import OpportunitiesGraphic from "../Assets/Opportunities1.png";

type Props = {};

const Opportnuties = (props: Props) => {
  const handleRegister = () => {
    Router.push("/auth/register");
  };

  return (
    <div className="py-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            <div className="relative">
              <dt>
                <br />
                <p className="ml-16 text-2xl font-medium leading-6 text-gray-900">
                  Unlock Opportunities with Your Impact Points
                </p>
              </dt>
              <br />
              <p className="mt-2 ml-16 text-xl text-gray-500">
                Convert your earned IMPs into exclusive opportunities.Learn more
                about these opportunities <button>here.</button>
              </p>
            </div>
            <div className="relative">
              <dt>
                <Image
                  src={OpportunitiesGraphic}
                  alt="mockup"
                  width={1500}
                  height="700"
                />
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Opportnuties;
