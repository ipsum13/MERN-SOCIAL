//require("dotenv/config");
//const config = require("config");
const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");

const Jimp = require("jimp");

const path = require("path");
const shortId = require("shortid");
const fs = require("fs-extra");
const uuidv4 = require("uuid");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: config.get('CLOUDINARY_NAME'),
  api_key: config.get('CLOUDINARY_API_KEY'),
  api_secret: config.get('CLOUDINARY_API_SECRET')
});


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }) /* .populate("user", ["name", "avatar"]); */ // might delete the populate later

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      // check("birthDate", "Birth Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      location,
      interests,
      pronouns,
      bio,
      email,

      education,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      email,
      location,
      pronouns,
      bio,
      education,
      interests: Array.isArray(interests)
        ? interests
        : interests.split(",").map((interest) => " " + interest.trim()),
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async ({ params: { user_id } }, res) => {
  // check if the id is a valid ObjectId
  /*   if (!mongoose.Types.ObjectId.isValid(user_id))
  return res.status(400).json({ msg: 'Invalid user ID' });  */

  try {
    const profile = await Profile.findOne({
      user: user_id,
    });

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/follow/:id
// @desc     Follow a user's profile
// @access   Private
router.put("/follow/:id", auth, async (req, res, next) => {
  try {
    // logged in user's profile
    let following = {
      user: req.params.id,
      name: req.body.name,
      avatar: req.body.avatar,
    };
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { following: following } }
    );
    // current user's profile
    let follower = {
      user: req.user.id,
      name: req.body.followerName,
      avatar: req.body.followerAvatar,
    };
 
    //console.log(req.body.name);
    if (
      profile.following.filter(
        (follow) => follow.user.toString() === req.params.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "User already followed" });
    }
    const followerProfile = await Profile.findOneAndUpdate(
      { user: req.params.id },
      { $push: { followers: follower } }
    );

    //profile.following.unshift({ user: req.params.id });

    //followerProfile.followers.unshift({ user: req.user.id });

    await followerProfile.save();

    await profile.save();

    return res.json({
      following: profile.following,
      followers: profile.followers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/unfollow/:id", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const followerProfile = await Profile.findOne({ user: req.params.id });
    // check if the profile has already been followed by the user

    if (
      profile.following.filter(
        (follow) => follow.user.toString() === req.params.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "Profile has not been liked yet" });
    }

    // get remove index

    const removeIndex = profile.following
      .map((follow) => follow.user.toString())
      .indexOf(req.params.id);

    const followerRemoveIndex = followerProfile.followers
      .map((follow) => follow.user.toString())
      .indexOf(req.user.id);

    profile.following.splice(removeIndex, 1);

    followerProfile.followers.splice(followerRemoveIndex, 1);

    await profile.save();

    await followerProfile.save();

    return res.json({
      following: profile.following,
      followers: profile.followers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", (req, res) => {
  Image.find(function(err, images) {
    if (err) {
      res.json(err.message);
    } else {
      res.json(images);
    }
  });
});

router.post("/upload/profilePic", [auth, upload.single("image")], (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, async(err, result)  => {
    if (err) {
      res.json(err.message);
    }
    req.body.image = result.secure_url;
    // add image's public_id to image object
    //req.body.imageId = result.public_id;

    //res.json(req.body.image)
    try {
    const profile = await Profile.findOneAndUpdate({user: req.user.id}, {profilePic: result.secure_url })
    const posts = await Post.updateMany({user: req.user.id}, {avatar: result.secure_url })
    res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }  
  });
});

router.get("/getProfilePicture", auth, (req, res) => {
  const profile = Profile.findOne({user: req.body.id})
  if(!profile) {
    return res.status(400).json({ msg: "There is no profile for this user" });
  }
  return res.json(profile.profilePic);
})




module.exports = router;
