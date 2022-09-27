import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import Image from "next/image";
import Footer from "../components/footer";
import NavBar from "../components/mainHeader";
import styles from "../styles/Home.module.css";
import mainGraphic from "../Assets/omdenabg.png";
import omdenaLore from "../Assets/omdenaLore.png";
import aws from "../Assets/aws.svg";
import azure from "../Assets/azure.svg";
import dagshub from "../Assets/dagshub.png";
import paths from "../Assets/paths.png";
import ImpactPoints from "../components/ImpactPoints";
import Opportnuties from "../components/Opportnuties";
import Paths from "../components/Paths";
import Testimonials from "../components/Testimonials";

const Home: NextPage = () => {
  const handleLogin = () => {
    Router.push("/auth/login");
  };

  const handleRegister = () => {
    Router.push("/auth/register");
  };

  const myLoader = () => {
    return `https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png`;
  };

  const myLoader2 = () => {
    return `https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png`;
  };
  const myLoader3 = () => {
    return `https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png`;
  };
  const myLoader4 = () => {
    return `https://flowbite.com/docs/images/logo.svg`;
  };
  const myLoader5 = () => {
    return `https://flowbite.com/docs/images/logo.svg`;
  };

  return (
    <>
      <Head>
        <title>Welcome to Omdena&apos;s Collaborator Dashboard</title>
        <meta
          name="description"
          content="Welcome to Omdena's Collaborator Dashboard"
        />
        <link rel="icon" href="/OmdenaFavicon.png" />
      </Head>

      <NavBar />

      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Your Collaborator Dashboard
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              This dashboard showcases your individual contributions to Omdena
              Projects, Omdena School and Local Chapters.
            </p>
            <button
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              onClick={handleLogin}
            >
              Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                data-modal-toggle="authentication-modal"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleRegister}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Register
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src={mainGraphic} alt="mockup" width={1500} height="500" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              Welcome to Omdena&apos;s Collaborator Dashboard
            </h2>
            <p className="mb-4 text-gray-500 sm:text-xl dark:text-gray-400">
              You are logged in as a Guest
            </p>
            <h4 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
              Want to become an Omdena Collaborator?
            </h4>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              Omdena Collaborators are omdena community members who have
              completed at least one Omdena 8-Week challenge.{" "}
              <a href="#">Apply to a project</a> to become an Omdena
              collaborator! Also, if you have any feedback regarding the
              dashboard please submit the <a href="#">feedback form</a>. Thank
              you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-8 text-3xl font-extrabold leading-tight tracking-tight text-center text-gray-900 lg:mb-16 dark:text-white md:text-4xl">
            AI Platform, Products & Tools
          </h2>
          <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 dark:text-gray-400">
            <a href="#" className="flex items-center justify-center">
              <Image src={omdenaLore} alt="mockup" width={100} height="100" />
            </a>
            <a href="#" className="flex items-center justify-center">
              <Image src={dagshub} alt="mockup" width={100} height="100" />
            </a>
            <a href="#" className="flex items-center justify-center">
              <Image src={azure} alt="mockup" width={100} height="100" />
            </a>

            <a href="#" className="flex items-center justify-center">
              <Image src={aws} alt="mockup" width={100} height="100" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800">
        <Testimonials />
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-1 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900 dark:text-white">
              Find the perfect opportunity to grow your career
            </h2>
            <div className="flex flex-row flex-wrap -mx-4 text-center">
              <div
                className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2">
                  <div className="inline-block mb-4 text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-normal text-black">
                    Become a Researcher
                  </h3>
                </div>
              </div>
              <div
                className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".1s"
              >
                <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2">
                  <div className="inline-block mb-4 text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      fill="currentColor"
                      className="bi bi-chat-square-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                      <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-normal text-black">
                    Become a Engineering Lead
                  </h3>
                </div>
              </div>

              <div
                className="flex-shrink w-full max-w-full px-4 sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="px-12 py-8 mb-12 transition duration-300 ease-in-out transform border-b border-gray-100 bg-gray-50 hover:-translate-y-2">
                  <div className="inline-block mb-4 text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      fill="currentColor"
                      className="bi bi-card-checklist"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"></path>
                      <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-normal text-black">
                    Become a Community Lead
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Your Impact Points <span className="font-extrabold">(IMP)</span>
            </h2>
            <br />
            <br />
          </div>
          <ImpactPoints />
          <br />
          <br />
          <Opportnuties />
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Career Path Development Platform
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Our 4 impact career paths for you
            </p>
            <h2 className="mb-4 text-xl font-bold leading-tight text-gray-900 dark:text-white">
              Depending on your interest and skill, you can follow one or more
              of the 4 paths.
            </h2>
            <Paths />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
