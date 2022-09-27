import React from "react";
import Image from "next/image";
import Router from "next/router";
import Logo from "../Assets/omdena.png";

type Props = {};

const mainHeader = () => {
  const handleHome = () => {
    Router.push("/");
  };

  const handleFeedback = () => {
    Router.push("/feedback");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <button className="flex items-center" onClick={handleHome}>
            <Image
              src={Logo}
              className="h-6 mr-3 sm:h-9"
              alt="Omdena"
              width="185"
              height="50"
            />
          </button>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <button
                  onClick={handleFeedback}
                  className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Report an Issue
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default mainHeader;
