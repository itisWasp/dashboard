import React from "react";
import Router from "next/router";
import Head from "next/head";

type Props = {};

const Success = (props: Props) => {
  const handleHome = () => {
    Router.push("/");
  };

  return (
    <>
      <Head>
        <title>Success Page</title>
        <meta
          name="description"
          content="Welcome to Omdena's Collaborator Dashboard"
        />
        <link rel="icon" href="/OmdenaFavicon.png" />
      </Head>
      <div className="relative flex flex-col items-center justify-center min-h-screen py-6 overflow-hidden bg-white sm:py-12">
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
            Check your inbox
          </h2>
          <p className="mb-2 text-lg text-zinc-500">
            We are glad, that you’re with us ? We’ve sent you a verification
            link to the email address you provided.{" "}
            <span className="font-medium text-indigo-500"></span>.
          </p>
          <button
            onClick={handleHome}
            className="inline-block px-5 py-3 mt-3 font-medium text-white bg-blue-500 rounded shadow-md w-96 shadow-indigo-500/20 hover:bg-blue-600"
          >
            Return Home →
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
