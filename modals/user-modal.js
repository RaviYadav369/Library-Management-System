const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        requied: true,
    },
    issuedbook:{
        type: mongoose.Schema.Types.ObjectID,
        rel: "Book",
        required: false,
    },
    returDate:{
        type: String,
        required: false,
    },
    subscriptionType:{
        type: String,
        required: true,
    },

  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Book",userSchema);