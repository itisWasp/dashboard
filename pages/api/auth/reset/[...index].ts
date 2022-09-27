import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import Joi from "joi";
import { sign } from "jsonwebtoken";
import validation from "../../../../middlewares/validation";
import { collaboratorTable, minifyRecords } from "../../../../helpers/AirTable";

const { SENDGRID_API_KEY, FROM_EMAIL, EMAIL_TOKEN_EXPIRE, TOKEN_SECRET }: any =
  process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const schema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const { email } = req.body;
      const userInfo = await collaboratorTable
        .select({
          filterByFormula: `Email = "${email}"`,
        })
        .firstPage();
      const user = minifyRecords(userInfo);
      const existingUserEmail = user.map((data: any) => data.fields.Email);
      const existingUserName = user.map((data: any) => data.fields.Name);
      const existingUserId = user.map((data: any) => data.id);

      if (existingUserEmail != email)
        return res.status(404).json({ message: "Invalid Credentials" });

      const data = {
        userData: { id: user[0].id, email: existingUserEmail[0] },
      };

      const token = sign(data, TOKEN_SECRET, { expiresIn: EMAIL_TOKEN_EXPIRE });

      const resetPasswordToken = sign(data, TOKEN_SECRET, {
        expiresIn: `${EMAIL_TOKEN_EXPIRE}s`,
      });

      const createResetTokens = await collaboratorTable.update([
        {
          id: existingUserId[0],
          fields: {
            resetPasswordToken,
          },
        },
      ]);
      const userResponse = minifyRecords(createResetTokens);

      // send email
      let link =
        "http://" +
        req.headers.host +
        "/auth/password/change/" +
        resetPasswordToken;
      const mailOptions = {
        to: email,
        from: FROM_EMAIL,
        subject: "Password change request",
        text: `Hi ${existingUserName} \n
      Please click on the following link ${link} to reset your password. \n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      sgMail
        .send(mailOptions)
        .then(() => {
          return res.status(200).json({
            message: "A reset email has been sent to " + email + ".",
          });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } catch (error: any) {
      return res.status(400).json({
        message: "Reset Password Failed Something went wrong",
        error: error.message,
      });
    }
  } else {
    res.status(500).json("Something went wrong");
  }
};

export default validation({ body: schema }, resetPassword);
