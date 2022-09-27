import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import Footer from "../../components/footer";
import NavBar from "../../components/mainHeaderPrivate";
import RemoveButton from "../../components/removeButton";
import AddButton from "../../components/addButton";
import withAuth from "../../HOC/withAuth";
import NameSkeleton from "../../components/Skeletons/Name";
import Points from "../../components/Skeletons/Points";
import Paragraph from "../../components/Skeletons/Paragraph";

type Props = {};

const CollaboratorProfile = (props: Props) => {
  const [isSSR, setIsSSR] = useState(true);
  const [data, setData] = useState([]);
  const [handleToggle, setHandleToggle] = useState("");
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const tokenParsed = JSON.parse(token || "");

    const config: any = {
      headers: {
        authorization: tokenParsed,
      },
    };

    if (!isSSR) {
      const getData = async () => {
        const response = await axios.get("/api/profile/user", config);
        setData(response.data.user);
        setLoader(false);
      };
      getData();
    }
  }, [isSSR]);

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
          <h1 className="pt-6 text-4xl font-medium text-white">
            {isLoading ? (
              <NameSkeleton />
            ) : (
              data.map((user: any) => user.fields.Name)
            )}
          </h1>
          <p className="mt-3 font-medium text-gray-300">
            Impact Points Earned{": "}
            <span className="text-lg ">
              {data.map((user: any) => user.fields.Gamification || "None")}
            </span>
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="container max-w-4xl px-6 py-10 mx-auto">
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
            My Profile
          </h1>

          <div className="mt-12 space-y-8">
            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Current Role
                </h1>
              </button>

              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {isLoading ? (
                  <Points />
                ) : data.length > 0 ? (
                  data.map((user: any) => user.fields["Current Role"] || "None")
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Tech Domain
                </h1>
              </button>

              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                None
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Lines of Code contributed to Omdena Challenges
                </h1>
              </button>

              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                These are the lines of code committed to GitHub or Dagshub
                during the course of an Omdena core project, if you have been
                part of many projects then it will be cumulative. The line of
                code is updated every week on Monday at 12 P.M. UTC. If it has
                been more than 6 months since you have contributed code then it
                will show None. <br />
                Cannot retrieve data, contact support@omdena.com to resolve this
                issue Thank you!
                <br />
                <span>
                  {isLoading ? (
                    <Points />
                  ) : data.length > 0 ? (
                    data.map((user: any) => user.fields.LOC || "None")
                  ) : (
                    <p>None</p>
                  )}
                </span>
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Number of Notebooks
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                This is the number of notebooks committed to the dagshub during
                a challenge.
                <br />
                <span>
                  {isLoading ? (
                    <Points />
                  ) : data.length > 0 ? (
                    data.map((user: any) => user.fields.Notebooks || "None")
                  ) : (
                    <p>None</p>
                  )}
                </span>
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Number of core Omdena challenges you have participated in
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {isLoading ? (
                  <Points />
                ) : data.length > 0 ? (
                  data.map((user: any) => user.fields["# Challenges"] || "None")
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Challenges you have participated in
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {isLoading ? (
                  <Points />
                ) : data.length > 0 ? (
                  data.map(
                    (user: any) =>
                      user.fields["Associated Challenges"] || "None"
                  )
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Challenges as Product Owner
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {isLoading ? (
                  <Points />
                ) : data.length > 0 ? (
                  data.map(
                    (user: any) =>
                      user.fields["challenge completed as productowner"] ||
                      "None"
                  )
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Have you been a local chapter lead?
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {isLoading ? (
                  <Points />
                ) : data.length > 0 ? (
                  data.map(
                    (user: any) => user.fields["#local chapters"] || "None"
                  )
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  Opportunities received from Omdena
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {isLoading ? (
                  <Points />
                ) : data.length > 0 ? (
                  data.map(
                    (user: any) =>
                      user.fields["# Opportunities Received"] || "None"
                  )
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>

            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <button className="flex items-center justify-between w-full p-8">
                <h1 className="font-mono text-lg font-semibold text-gray-700 dark:text-white">
                  SSH Keys
                </h1>
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />

              <p className="object-fill p-8 text-sm text-gray-500 break-words dark:text-gray-300">
                {isLoading ? (
                  <Paragraph />
                ) : data.length > 0 ? (
                  data.map((user: any) => user.fields["ssh_private"] || "None")
                ) : (
                  <p>None</p>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollaboratorProfile;
