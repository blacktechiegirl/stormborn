const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter your Username"],
  },
  email: {
    type: String,
    required: [true, "Enter a valid email address"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minlength: 8,
    select: false
  },
});

UsersSchema.pre("save", async function(next){
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UsersSchema.methods.comparePassword= async function(storedPassword, enteredPassword) {
    return await bcrypt.compare(storedPassword, enteredPassword)
}

//convert schema to model

module.exports = mongoose.model("users", UsersSchema);
