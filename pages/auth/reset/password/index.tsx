import Head from "next/head";
import React, { SyntheticEvent, useState, useRef } from "react";
import Router from "next/router";
import axios from "axios";
import Spinner from "../../../../components/Spinner";

type Props = {};

const ResetPassword = (props: Props) => {
  const [Email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const errRef: any = useRef();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoggedIn("logging in");

    const data = {
      email: Email,
    };
    try {
      const payload = await axios.post("/api/auth/reset/password", data);
      const accessToken: string = payload.data.accessToken;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      setEmail("");

      await Router.push("/auth/reset/success");
    } catch (error: any) {
      error.response.status === 404
        ? setErrMsg("Invalid Credentials")
        : setErrMsg(error.response.data.message);
      setIsLoggedIn("");
      errRef.current.focus();
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="Welcome to Omdena's Collaborator Dashboard"
        />
        <link rel="icon" href="/OmdenaFavicon.png" />
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-lg p-10 bg-white border rounded-2xl shadow-x1">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="w-4/6 text-2xl font-bold text-center text-gray-700">
              Forgot Your Password?
            </h1>
            {isLoggedIn === "logging in" ? <Spinner /> : ""}
            <p
              ref={errRef}
              className={`${
                errMsg ? "errmsg" : "offscreen"
              } font-bold text-red-500 text-lg pt-4 text-center`}
              role="alert"
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <p className="w-5/6 text-sm text-center text-gray-500">
              To reset your password, please enter your email address.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="none"
                autoFocus
                className="w-full h-12 px-4 border-2 rounded-lg"
                required
              />
              <button
                className="w-full px-4 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
