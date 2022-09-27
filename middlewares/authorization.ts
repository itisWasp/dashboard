import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { verify } from "jsonwebtoken";
import { promisify } from "util";

const withProtect = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Get token and check if it exists
    let token;
    const secret: any = process.env.TOKEN_SECRET;
    ``;

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to get access.",
      });
    }

    try {
      // Verify token
      verify(token, secret);
      return handler(req, res);
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "Please log in to get access.",
      });
    }
  };
};

export default withProtect;
