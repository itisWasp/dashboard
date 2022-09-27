import jwt from "jsonwebtoken";

const verifyToken = async (token: any) => {
  try {
    const secret: any = process.env.TOKEN_SECRET;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return err;
  }
};

export default verifyToken;
