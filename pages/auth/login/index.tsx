import Head from "next/head";
import React, { SyntheticEvent, useState, useRef } from "react";
import Router from "next/router";
import axios from "axios";
import Spinner from "../../../components/Spinner";

type Props = {};

const Login = (props: Props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const errRef: any = useRef();

  const handleHome = () => {
    Router.push("/");
  };

  const handleRegister = () => {
    Router.push("/auth/register");
  };
  const handleGuestLogin = () => {
    Router.push("/guest/login");
  };

  const handleForgotPassword = () => {
    Router.push("/auth/reset/password");
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoggedIn("logging in");

    const data = {
      email: Email,
      password: Password,
    };
    try {
      const payload = await axios.post("/api/auth/login", data);
      const accessToken: string = payload.data.accessToken;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      setEmail("");
      setPassword("");

      await Router.push("/home");
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
        <title>Login</title>
      </Head>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <button onClick={handleHome}>
                Who is an Omdena Collaborator?
              </button>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              Omdena Collaborators are Omdena community members who have
              completed at least one Omdena 8-week challenge.
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don&apos;t have an account?</span>
              <button onClick={handleRegister} className="underline">
                Get Started!
              </button>
            </p>
            <p className="flex flex-col items-center justify-center text-center">
              <span>Or</span>
              <button onClick={handleGuestLogin} className="underline">
                Sign In As Guest
              </button>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a href="#" className="underline">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                conditions
              </a>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-center text-gray-700">
              Account Login
            </h3>
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
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="none"
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="none"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
              </div>
              <div className="flex items-center space-x-2"></div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
