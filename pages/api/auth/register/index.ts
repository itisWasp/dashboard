import { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { genSalt } from "bcrypt";
import Joi from "joi";
import validation from "../../../../middlewares/validation";
import {
  collaboratorTable,
  minifyRecords,
  localChapterTable,
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
  // firstName: Joi.string()
  //   .empty()
  //   .min(4)
  //   .max(10)
  //   .pattern(/^[a-zA-Z]/)
  //   .messages({
  //     "any.required": "{{#label}} field is required",
  //     "string.base": "{{#label}} must be of type string",
  //     "string.empty": "{{#label}} can not be empty",
  //     "string.pattern.base":
  //       "{{#label}} must contain only characters from a to z.",
  //   }),
  // lastName: Joi.string()
  //   .empty()
  //   .min(4)
  //   .max(10)
  //   .pattern(/^[a-zA-Z]/)
  //   .messages({
  //     "any.required": "{{#label}} field is required",
  //     "string.base": "{{#label}} must be of type string",
  //     "string.empty": "{{#label}} can not be empty",
  //     "string.pattern.base":
  //       "{{#label}} must contain only characters from a to z.",
  //   }),
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

const registerCollaborator = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method == "PATCH") {
    try {
      const { firstName, lastName, userName, email, password } = req.body;
      const userInfo = await collaboratorTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();

      const userInfoChapterTable = await localChapterTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();

      const user = minifyRecords(userInfo);
      const userChapter = minifyRecords(userInfoChapterTable);
      const existingUserId = user.map((data: any) => data.id);
      const existingUserPassword = user.map(
        (data: any) => data.fields.Password
      );
      const existingUserIdSchool = userChapter.map((data: any) => data.id);
      const existingUserPasswordSchool = userChapter.map(
        (data: any) => data.fields.Password
      );
      const salt: string = await genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);

      if (userInfo.length === 0 && userInfoChapterTable.length === 0)
        return res.status(400).json({
          message:
            "Make Sure to Provide Email address you used to sign up to an Omdena Challenge or Omdena School ",
        });

      if (
        (userInfo.length !== 0 && existingUserPassword[0] != false) ||
        (userInfoChapterTable.length !== 0 &&
          existingUserPasswordSchool[0] != false)
      )
        return res
          .status(400)
          .json({ message: "Account Already Created Please Login" });

      if (userInfo.length !== 0) {
        const createUser = await collaboratorTable.update([
          {
            id: existingUserId[0],
            fields: {
              Password: hashedPassword,
            },
          },
        ]);
        const userResponse = minifyRecords(createUser);
        return res.status(200).json({
          message: "User Registered Successfully :)",
          payload: userResponse,
        });
      }

      const createUserSchool = await localChapterTable.update([
        {
          id: existingUserIdSchool[0],
          fields: {
            Password: hashedPassword,
          },
        },
      ]);
      const userResponse = minifyRecords(createUserSchool);
      return res.status(200).json({
        message: "User Registered Successfully :)",
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

export default validation({ body: schema }, registerCollaborator);
