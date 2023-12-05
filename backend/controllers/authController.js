import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { isRequired } from "../middleware/fieldMiddleware.js";
import { otpModel } from "../models/otpModel.js";

const jwt_sing = "nielit_123";
const jwt_time = "1h";

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = isRequired(req.body, [
      "email",
      "password",
      "name",
    ]);
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(password, salt);

    user = await userModel.create({
      name: name,
      email: email,
      password: encryptPass,
    });

    const jwtToken = jwt.sign(
      {
        user_id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
      jwt_sing,
      {
        expiresIn: jwt_time,
      }
    );

    res.json({ jwtToken });

    /////////////////////////// sending mail to the user ////////////////////////////////////////////////////////////

    if (jwtToken) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nk999549@gmail.com",
          pass: "",
        },
      });

      async function main() {
        const info = await transporter.sendMail({
          from: "<nk999549@gmail.com>",
          to: email,
          subject: "User Details",

          html: `<div style={{border: 2px solid:black}}>
                      <h2>Dear Applicant,</h2>
            
                      <h2>Welcome to Student Registration Portal NIELIT Haridwar</h2>
                      
                      <h2>Your login account details are as follows:
                      <br>
                      Registered Email: ${email}
                      <br>
                      Username: ${email}
                      <br>
                      Password: ${password}</h2>
                      
                    </div>`,
        });

        console.log("Message sent");
      }

      main().catch(console.error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const singIn = async (req, res) => {
  try {
    const { email, password } = isRequired(req.body, ["email", "password"]);
    
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    } 

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const jwtToken = jwt.sign(
      {
        user_id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
      jwt_sing,
      {
        expiresIn: jwt_time,
      }
    );

    return res.status(200).json({ jwtToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const forgetPass = async (req, res) => {
  try {
    const { email } = isRequired(req.body, ["email"]);
    const user = await userModel.findOne({email})
    if (user == null) {
      throw Error("User not Found")
    } 
 
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nk999549@gmail.com",
          pass: "",
        },
      });

      
      await otpModel.findOneAndDelete({ email });

      const otp = Math.floor(Math.random() * 1000000)
      const user_id = user._id

      const new_otp = await otpModel.create({user_id, otp});
 
        await transporter.sendMail({
          from: "<nk999549@gmail.com>", to: email,
          subject: "User Forget Password", 
          html: `<div style={{border: 2px solid:black}}>
                      <h2>Dear Applicant,</h2> 
                      <h2>Your forget Password Otp is:
                      <br> 
                      Otp: ${otp}</h2> 
                    </div>`,
        });  

        console.log("Sent");
        return res.json({message: "Otp Send"})

  } catch (err) {
    console.log(err.message);
    return res.status(400).json({message: "Otp Error"})
  }
}

export const checkOtp = async (req, res) => {
  try {
    const { email, otp, new_password } = isRequired(req.body, ["email", "otp", "new_password"]);
    
    const user = await userModel.findOne({email});
    const old_otp = await otpModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    } 
    if (!old_otp) {
      return res.status(404).json({ error: "User Not Found" });
    } 

    if (otp != old_otp.otp) {
      return res.status(404).json({ error: "Otp Not MAtch" });
    } 
    await otpModel.findOneAndDelete({ email });

    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(new_password, salt);
    const new_user = await userModel.updateOne({email}, {$set: {password: encryptPass}})
 
    return res.status(200).json({ message: done });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};