import React from "react";
import Image from "next/image";
import ImpactPointsGraphic from "../Assets/ImpactPoints1.png";

type Props = {};

const ImpactPoints = (props: Props) => {
  return (
    <div className="py-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            <div className="relative">
              <dt>
                <Image
                  src={ImpactPointsGraphic}
                  alt="mockup"
                  width={1500}
                  height="700"
                />
              </dt>
            </div>

            <div className="relative">
              <dt>
                <br />
                <p className="ml-16 text-2xl font-medium leading-6 text-gray-900">
                  Earn Impact Points
                </p>
              </dt>
              <br />
              <p className="mt-2 ml-16 text-base text-xl text-gray-500">
                IMP is tokens rewarded by Omdena for the impact you have made on
                the community. For each core challenge completion, you’ll
                receive IMP based on your role and level of exceptional work in
                the challenge.
              </p>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ImpactPoints;
