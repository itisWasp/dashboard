import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import Joi from "joi";
import bcrypt, { genSalt } from "bcrypt";
import validation from "../../../../middlewares/validation";
import { collaboratorTable, minifyRecords } from "../../../../helpers/AirTable";

const { TOKEN_SECRET }: any = process.env;

const schema = Joi.object({
  password: Joi.string()
    .required()
    .empty()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
    .messages({
      "any.required": "{{#label}} field is required",
      "string.base": "{{#label}} must be of type string",
      "string.empty": "{{#label}} can not be empty",
      "string.pattern.base":
        "{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters",
    }),
});

const updatePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "PATCH") {
    try {
      const { password } = req.body;
      const token: any = req.query.index;
      const { userData }: any = verify(token[0], TOKEN_SECRET);
      const { id, email } = userData;

      const userInfo = await collaboratorTable
        .select({
          filterByFormula: `RecordId = "${id}"`,
        })
        .firstPage();
      const user = minifyRecords(userInfo);

      const salt: string = await genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);

      const updatePassword = await collaboratorTable.update([
        {
          id: user[0].id,
          fields: {
            Password: hashedPassword,
          },
        },
      ]);
      const userResponse = minifyRecords(updatePassword);

      res
        .status(200)
        .json({ message: "Password updated successfully", userResponse });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json("Something went wrong");
  }
};

export default validation({ body: schema }, updatePassword);
