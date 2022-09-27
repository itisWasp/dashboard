import React from "react";
import Image from "next/image";
import Person1 from "../Assets/Person1.jpg";
import Person2 from "../Assets/Person2.jpg";
import Person3 from "../Assets/Person3.jpg";

type Props = {};

const Testimonials = (props: Props) => {
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="mb-20 text-center">
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl title-font">
          TESTIMONALS
        </h1>
        <p className="mx-auto text-base leading-relaxed text-gray-500 xl:w-2/4 lg:w-3/4 dark:text-gray-400">
          What people say about us?
        </p>
        <div className="flex justify-center mt-6">
          <div className="inline-flex w-16 h-1 bg-indigo-500 rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
        <div className="flex flex-col items-center p-4 text-center md:w-1/3">
          <Image
            src={Person1}
            alt="mockup"
            className="border border-gray-100 rounded-full shadow-sm"
          />
          <div className="flex-grow">
            <h2 className="mb-3 text-lg font-medium text-gray-900 dark:text-white title-font">
              Sakthisree Venkatesan
            </h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The community made me feel a sense of freedom and provided a
              non-judgmental environment where I was enabled to help others.
            </p>
            <a className="inline-flex items-center mt-3 text-indigo-500">
              Data Wrangler
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 text-center md:w-1/3">
          <Image
            src={Person2}
            alt="mockup"
            width={150}
            height={150}
            className="border border-gray-100 rounded-full shadow-sm "
          />
          <div className="flex-grow">
            <h2 className="mb-3 text-lg font-medium text-gray-900 dark:text-white title-font">
              Neil Sahota
            </h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Collaborative AI enables robust AI solutions through sharing
              knowledge, perspectives, and promoting diversity and inclusion.
            </p>
            <a className="inline-flex items-center mt-3 text-indigo-500">
              Global AI expert, Senior Mentor
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 text-center md:w-1/3">
          <Image
            src={Person3}
            alt="mockup"
            width={150}
            height={150}
            className="border border-gray-100 rounded-full shadow-sm"
          />
          <div className="flex-grow">
            <h2 className="mb-3 text-lg font-medium text-gray-900 dark:text-white title-font">
              Xavier Torres Fatsini
            </h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              After the Omdena project, I see that career adaptation was a
              necessary thing in today’s trends.
            </p>
            <a className="inline-flex items-center mt-3 text-indigo-500">
              Professor ESADE, Lead ML Engineer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
