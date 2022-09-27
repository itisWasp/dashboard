import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import withProtect from "../../../middlewares/authorization";
import { schoolTable, minifyRecords } from "../../../helpers/AirTable";

const userSchool = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const { TOKEN_SECRET }: any = process.env;
      const token: any = req.headers.authorization?.replace("Bearer ", "");
      const { userData }: any = verify(token, TOKEN_SECRET);
      const { id, email } = userData;

      const userInfo = await schoolTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();
      const user = minifyRecords(userInfo);

      res
        .status(200)
        .json({ message: "School Profile retrieved successfully", user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json("Something went wrong");
  }
};

export default withProtect(userSchool);
