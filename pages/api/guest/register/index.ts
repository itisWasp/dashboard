import { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { genSalt } from "bcrypt";
import Joi from "joi";
import validation from "../../../../middlewares/validation";
import {
  collaboratorTable,
  guestTable,
  minifyRecords,
} from "../../../../helpers/AirTable";

const schema = Joi.object({
  userName: Joi.string()
    .empty()
    .min(4)
    .max(10)
    .pattern(/^[a-zA-Z]/)
    .messages({
      "any.required": "{{#label}} field is required",
      "string.base": "{{#label}} must be of type string",
      "string.empty": "{{#label}} can not be empty",
      "string.pattern.base":
        "{{#label}} must contain only characters from a to z.",
    }),

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

const registerGuest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const { firstName, lastName, userName, email, password } = req.body;
      const userInfo = await guestTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();
      const user = minifyRecords(userInfo);
      const existingUserId = user.map((data: any) => data.id);
      const existingUserEmail = user.map((data: any) => data.fields.Email);
      const existingUserPassword = user.map(
        (data: any) => data.fields.Password
      );
      const salt: string = await genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);

      if (existingUserEmail == email && existingUserPassword[0] != false)
        return res
          .status(400)
          .json({ message: "Account Already Created Please Login." });

      const createUser = await guestTable.create([
        {
          fields: {
            Name: userName,
            Email: email,
            Password: hashedPassword,
          },
        },
      ]);
      const userResponse = minifyRecords(createUser);
      return res.status(200).json({
        message: "Guest Registered Successfully :)",
        payload: userResponse,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Registration Failed Something went wrong",
        error: error.message,
      });
    }
  } else {
    res.status(500).json("Something went wrong");
  }
};

export default validation({ body: schema }, registerGuest);
