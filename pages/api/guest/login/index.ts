import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Joi, { exist } from "joi";
import { sign } from "jsonwebtoken";
import validation from "../../../../middlewares/validation";
import { guestTable, minifyRecords } from "../../../../helpers/AirTable";

const { TOKEN_SECRET, TOKEN_EXPIRE }: any = process.env;

const schema = Joi.object({
  email: Joi.string().email().required(),
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

const loginGuest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const { email, password } = req.body;
      const userInfo = await guestTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();
      const user = minifyRecords(userInfo);
      const existingUserEmail = user.map((data: any) => data.fields.Email);
      const existingUserPassword = user.map(
        (data: any) => data.fields.Password
      );
      const checkPassword = await bcrypt.compare(
        password,
        existingUserPassword[0] || ""
      );
      if (existingUserEmail != email)
        return res.status(404).json({ message: "Invalid Credentials" });

      if (!checkPassword)
        return res.status(404).json({ message: "Invalid Credentials" });

      const data = {
        userData: {
          id: user[0].id,
          email: existingUserEmail[0],
          role: "Guest",
        },
      };
      const token = sign(data, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE });
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({
        message: "User Logged In Successfully :)",
        accessToken: token,
      });
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(500).json("Something went wrong");
  }
};

export default validation({ body: schema }, loginGuest);
