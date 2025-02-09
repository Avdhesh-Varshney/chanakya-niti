import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';
import fetchuser from '../middleware/fetchuser.js';
import nodemailer from 'nodemailer';
//for oauth
import { googleLogin } from "../middleware/oAuthLogin.js";
import axios from "axios";




const JWT_SECRET = process.env.JWT_SECRET || 'Skanarul$123@';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1h';
const router = express.Router();
console.log("JWT_SECRET:", JWT_SECRET); 




// Route 1: Create a User using: POST "/api/auth/signup". No Login Required
router.post('/signup', [
  // Setting a validation so that input value will be verified before sending to the dataset
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists." });
    }

    // Implementing a hashing system to protect the password using 'bcrypt' package
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });

    const data = {
      user: {
        id: user.id
      }
    }
   // Verify JWT_SECRET is correctly set
    console.log("JWT_SECRET:", JWT_SECRET);
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    // jwt will signature a token and give it to the user after login or say after verification/authentication
    const authToken = jwt.sign(data, JWT_SECRET,{ expiresIn: JWT_EXPIRY });
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});

// Route 2: Authenticate a User using: POST "/api/auth/login". No Login Required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  console.log('Login request received:', req.body);
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET,{ expiresIn: JWT_EXPIRY });
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});



//

// Oauth Route 1 : Login with google
router.get("/google", async (req, res) => {
  const code = req.query.code;
  try {
    const googleRes = await googleLogin.getToken(code);
    googleLogin.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name } = userRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      //demo password
      const password = "123#Eds@2024";
      // Implementing a hashing system to protect the password using 'bcrypt' package
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      user = await User.create({
        name,
        email,
        password: securePassword,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });
    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//Oauth Route 2 : Login With Github
router.get("/github", async (req, res) => {
  try {
    const code = req.query.code;
    const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
    const response = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      { headers: { Accept: "application/json" } }
    );
    res.json(response.data);
  } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
  }
});

//Oauth Route 3 : Get user details from github api
router.get("/github/getUser", async (req, res) => {
  try {
    req.get("Authorization");
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: req.get("Authorization"),
      },
    });
    const {name,email} = await response.data;
    let user = await User.findOne({ email: email || "mail123@gmail.com" });//if the github user already created an account with this email before
    if (!user) {
      //demo password
      const password = "123#Eds@2024";
      // Implementing a hashing system to protect the password using 'bcrypt' package
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      user = await User.create({
        name:name,
        email:email||"mail123@gmail.com",//if user hides the email
        password: securePassword,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });
    res.status(200).json({
      message: "success",
      token,
      user:{
        name : user.name,
        email:user.email
      }
    });
  } catch (error) {
     console.log(error);
     res.status(500).json({
       message: "Internal Server Error",
     });
  }
});

//twitter oauth

import { Client, auth } from "twitter-api-sdk";

let accessToken = "";

const BACKEND_URL = process.env.BACKEND_URL;

const authClient = new auth.OAuth2User({
  client_id: process.env.X_CLIENT_ID,
  client_secret: process.env.X_CLIENT_SECRET,
  callback: `${BACKEND_URL}/api/auth/callback`,
  scopes: ["tweet.read", "users.read"],
});

const client = new Client(authClient);

const STATE = "my-state";

router.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
    accessToken = (await authClient.requestAccessToken(code)).token
      .access_token;
    // console.log("AccessToken: " + JSON.stringify(accessToken));

    const user = await client.users.findMyUser();
//find if the user exists in db or create one
    let findUser = await User.findOne({ name: user.data.name }); //can't access email from twitter
    const email = "testEmail123@gmail.com"; // test email
    if (!findUser) {
      //demo password
      const password = "123#Eds@2024";
      // Implementing a hashing system to protect the password using 'bcrypt' package
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      findUser = await User.create({
        name: user.data.name,
        email: email,
        password: securePassword,
      });
    }
    const { _id } = findUser;
    const token = jwt.sign({ _id, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });


    res.send(`
      <html>
      <body>
        <p>You have been authenticated with this platform. You can close the window now.</p>
        <script>
          // Pass the access token and status to the parent window
          window.opener.postMessage({ AccessToken: ${JSON.stringify(
            accessToken
          )}, status: "Login successful",token:${JSON.stringify(token)}, user :${JSON.stringify({name:findUser.name,email:findUser.email,x_username:user.data.username})} }, "*");

          // Close the window after a delay
          setTimeout(() => {
            window.close();
          }, 2000); // 2 seconds delay
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Oauth Route 4 : login with twitter
router.get("/x_twitter", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  // console.log(authUrl);
  res.redirect(authUrl);
});

//Oauth Route 5 : find the twitter user in db
router.get("/x_twitter/getUser",async(req,res)=>{
  const {name} = req.query;
  try {
    let findUser = await User.findOne({name:name}); //can't access email from twitter
    const email = "testEmail123@gmail.com"
    if (!findUser) {
      //demo password
      const password = "123#Eds@2024";
      // Implementing a hashing system to protect the password using 'bcrypt' package
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      findUser = await User.create({
        name: name,
        email: email,
        password: securePassword,
      });
    }
    const { _id } = findUser;
    const token = jwt.sign({ _id, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    res.status(200).json({
      token,
      user:{
        name:findUser.name,
        email:findUser.email,
      }

    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    
  }
})


//



// Route 3: Get logged-in User Details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:",error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//4 Route to send password reset link. use POST "/auth/restPasswordLink"
router.post('/resetPasswordLink', [
  body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    const secret = JWT_SECRET + user.password;
    const token = await jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: JWT_EXPIRY });

    const url = `${process.env.FRONTEND_URL}/auth/resetpassword/${user._id}/${token}`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Link',
      text: `Click on the link below to reset your password:\n${url}`,
      html: `<h2>Click on the link below to reset your password</h2><a href="${url}">Password Reset</a>`
    });

    res.status(200).json({ message: "Password reset link has been sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//5 Route to reset password. use POST "/api/auth/resetpassword/:id/:token"
router.post('/resetpassword/:id/:token', [
  body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const secret = JWT_SECRET + user.password;
    const decoded = jwt.verify(token, secret);

    if (decoded.id === user._id.toString()) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.status(200).json({ message: "Password reset successful" });
    } else {
      res.status(400).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});


export default router;


