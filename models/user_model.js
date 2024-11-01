const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 } // 0 => normal user, 1 => admin, 2 => subadmin, 3 => editor
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
