import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import logo from "../../../../Assets/omdena.png";
import Spinner from "../../../../components/Spinner";

type Props = {};

const ChangePassword = (props: Props) => {
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const errRef: any = useRef();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password: any = useRef();

  const { query } = useRouter();
  const { token }: any = query;
  const jwtToken = typeof token === "object" ? token[0] : " ";

  password.current = watch("password", "");
  const onSubmit = async (data: any) => {
    const { password_repeat }: any = data;
    const body = {
      password: password_repeat,
    };

    setIsLoggedIn("logging in");

    const payload = axios.patch(`/api/auth/update/${jwtToken}`, body);
    payload
      .then((payload: any) => {
        setSuccMsg(payload.data.message);
        setIsLoggedIn("");
      })
      .catch((error: any) => {
        error.response.status === 400
          ? setErrMsg("Token Expired Try again :(")
          : setErrMsg(error.response.data.message);
        setIsLoggedIn("");
        errRef.current.focus();
      });
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta
          name="description"
          content="Welcome to Omdena's Collaborator Dashboard"
        />
        <link rel="icon" href="/OmdenaFavicon.png" />
      </Head>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-900 border border-gray-900 min-h-1/2 rounded-2xl">
          <div className="flex flex-col items-center py-16 mx-4 mx-auto space-y-4 font-semibold text-gray-500 sm:mx-24 md:mx-34 lg:mx-56">
            <Link href="/" passHref>
              <Image
                src={logo}
                alt="Omdena"
                width="200"
                height="100"
                className="object-contain w-full h-4 hover:cursor-pointer"
              />
            </Link>
            {isLoggedIn === "logging in" ? <Spinner /> : ""}
            <p
              ref={errRef}
              className={`${
                errMsg ? "errmsg" : "hidden"
              } font-bold text-red-500 text-lg pt-4 text-center`}
              role="alert"
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <p
              className={`${
                succMsg ? "errmsg" : "hidden"
              } font-bold text-green-500 text-lg pt-4 text-center`}
              role="alert"
              aria-live="assertive"
            >
              {succMsg}
            </p>
            <h1 className="text-2xl text-white">Reset your Password</h1>
            <input
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:border-blue-700"
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: "You must specify a password",
                pattern: PWD_REGEX,
              })}
            />
            {errors.password && (
              <p>
                Password must be 8 characters or more contains an Uppercase,{" "}
                <br />a Number and a special character.{" "}
              </p>
            )}
            <input
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md "
              placeholder="Confirm your Password"
              type="password"
              {...register("password_repeat", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.password_repeat && <p>The passwords do not match</p>}
            <input
              className="w-full p-2 font-bold text-gray-900 border border-gray-700 rounded-full bg-gray-50 hover:cursor-pointer hover:bg-gray-200"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
