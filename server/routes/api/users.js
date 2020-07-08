const express = require("express");
var router = express.Router();
const gravatar = require("gravatar");
const normalize = require("normalize-url");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');


// const Jimp = require('jimp');
// const multer = require('multer');
// const path = require('path');
// const shortId = require('shortid');

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");




// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    //console.log(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/users
// @desc Test route
// @access Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(403)
          .json({ msg: "User already exists" });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      const profile = new Profile({
        user: user.id,
        name,
        email,
        avatar
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      await profile.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("JWT_SECRET"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.send("User Registered");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid login credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid login credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("JWT_SECRET"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({msg: "Oops...there was an error."});
    }
  }
);


const client = new OAuth2Client(config.get("GOOGLE_CLIENT_ID"));
router.post('/google-login', (req, res) => {
  const { idToken } = req.body;

    client.verifyIdToken({ idToken, audience: config.get("GOOGLE_CLIENT_ID") }).then(response => {
        // console.log('GOOGLE LOGIN RESPONSE',response)
        const { email_verified, name, email, imageUrl } = response.payload;
        if (email_verified) {
             User.findOne({ email }).exec((err, user) => {
                if (user) {
                  const payload = {
                    user: {
                      id: user._id,
                    },
                  };
                    const token = jwt.sign( payload, config.get("JWT_SECRET"), { expiresIn: 360000 });
                    const { _id, email, name } = user;
                    return res.status(200).json({
                        token,
                        user: { _id, email, name }
                    });
                } else {
                    let password = email + config.get("JWT_SECRET");
                    const avatar = normalize(
                      gravatar.url(email, {
                        s: "200",
                      }),
                      { forceHttps: true }
                    );
                    user = new User({ name, email, password, avatar });
                    const profile = new Profile({
                      user: user._id,
                      name,
                      email,
                      avatar
                    });
                    user.save((err, data) => {
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                msg: 'User signup failed with google'
                            });
                        }
                        const token = jwt.sign({ _id: data._id }, config.get("JWT_SECRET"), { expiresIn: 360000 });
                        const { _id, email, name } = data;
                        return res.status(200).json({
                            token,
                            user: { _id, email, name }
                        });
                    });
                    profile.save();

                }
            });
        } else {
            return res.status(500).json({
                msg: 'Google login failed. Try again'
            });
        }
    });
})

module.exports = router;
