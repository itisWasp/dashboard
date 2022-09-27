import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import verifyToken from "./services/verifyToken";

type Props = {};

const withAuth = (WrappedComponent: any) => {
  const WithAuth = (props: Props) => {
    const Router = useRouter();
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
      setIsSSR(false);
    }, []);
    if (!isSSR) {
      const accessToken: any = localStorage.getItem("accessToken") || "";
      const checkToken =
        accessToken.startsWith('"') || accessToken.endsWith('"');
      if (!checkToken) {
        Router.push("/auth/login");
        return null;
      }
      const token: string = JSON.parse(accessToken);
      const response = verifyToken(token);
      response
        .then((data: any) => {
          if (
            data.message === "jwt malformed" ||
            data.message === "jwt expired" ||
            data.message === "invalid token"
          ) {
            Router.replace("/auth/login");
            return null;
          }
          if (
            data.status === 400 ||
            data.status === 401 ||
            data.status === 403 ||
            data.status === 404 ||
            data.status === 500
          ) {
            Router.push("/auth/login");
            return null;
          }
        })
        .catch((err: any) => {
          Router.push("/auth/login");
          return null;
        });
      // If there is no access token we redirect to "/" page.
      if (!accessToken || !response) {
        Router.replace("/auth/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return WithAuth;
};

export default withAuth;
