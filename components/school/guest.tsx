import React from "react";
import NameSkeleton from "../../components/Skeletons/Name";
import Points from "../../components/Skeletons/Points";
import Paragraph from "../../components/Skeletons/Paragraph";

type Props = {};

const GuestSchoolProfile = (props: Props) => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"></div>
      </section>

      <section className="bg-white dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid order-last grid-cols-3 mt-20 text-center md:order-first md:mt-0">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 flex items-center justify-center w-48 h-48 mx-auto -mt-24 text-indigo-500 bg-indigo-100 rounded-full shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="pb-12 mt-20 text-center border-b">
          <h1 className="pt-6 text-4xl font-medium text-white">Guest User</h1>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="container max-w-4xl px-6 py-10 mx-auto">
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
            Omdena School Profile
          </h1>

          <div className="mt-12 space-y-8">
            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Omdena School Courses Taken
                </h1>
              </button>

              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                Taste Of NLP
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Which Omdena Local Chapter do you belong to?
                </h1>
              </button>

              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                Nigeria Local Chapter
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GuestSchoolProfile;
