const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

mongoose.Promise = require("bluebird");
const connectDB = async () => {
  await mongoose
  .connect(db, {
    promiseLibrary: require("bluebird"), useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));
}

module.exports = connectDB;

