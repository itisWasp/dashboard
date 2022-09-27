import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import withProtect from "../../../middlewares/authorization";
import {
  localChapterTable,
  minifyRecords,
  collaboratorTable,
} from "../../../helpers/AirTable";

const userProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const { TOKEN_SECRET }: any = process.env;
      const token: any = req.headers.authorization?.replace("Bearer ", "");
      const { userData }: any = verify(token, TOKEN_SECRET);
      const { id, email } = userData;

      const userInfo = await localChapterTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();

      const user = minifyRecords(userInfo);

      const userInfoCollaborator = await collaboratorTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();
      const userCollaboratorData = minifyRecords(userInfoCollaborator);

      res.status(200).json({
        message: "Profile retrieved successfully",
        user,
        Association: userCollaboratorData || "",
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json("Something went wrong");
  }
};

export default withProtect(userProfile);
