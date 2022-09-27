import withJoi from "next-joi";
import { NextApiRequest, NextApiResponse } from "next";

export default withJoi({
  onValidationError: (
    req: NextApiRequest,
    res: NextApiResponse,
    error: any
  ): any => {
    return res.status(422).json({
      error: error.details[0].message.replace(/["'`]+/g, ""),
    });
  },
});
