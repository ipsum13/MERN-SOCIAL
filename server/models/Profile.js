const mongoose = require("mongoose");

const getRandomProfilePicture = () => `/images/avatars/default/avatar_default_${Math.floor((Math.random() * 5) + 0)}.png`;


const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  profilePic: {
   type: String,
    default: getRandomProfilePicture
  },
  avatar: {
    type: String,
  },
  location: {
    type: String,
  },
  interests: {
    type: [String],
    required: true,
  },
  pronouns: {
    type: [String],
  },
  bio: {
    type: String,
  },

  birthDate: {
    type: Date
  },

  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        ref: 'User'
      },
      avatar: {
        type: String,
        ref: 'User'
      }
    },
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        ref: 'User'
      },
      avatar: {
        type: String,
        ref: 'User'
      }
    },
  ],

  education: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
