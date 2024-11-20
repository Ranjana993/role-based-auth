const randomString = require("randomstring")
const User = require("../models/user_model")
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body
    if (!(name || email)) {
      return res.status(401).json({ success: false, message: "Please enter name and email " })
    }

    const isExist = await User.findOne(({ email }))
    if (isExist) {
      return res.status(400).json({ success: false, message: "email already exist" })
    }

    const password = randomString.generate(6);
    const hashedPass = await bcrypt.hash(password, 10)

    var obj = { name, email, password: hashedPass }
    if (req.body.role && req.body.role === 1) {
      return res.status(400).json({ success: false, message: "you can't create admin" })
    }
    else if (req.body.role) {
      obj.role = req.body.role
    }
    const user = User(obj);
    const newUser = await user.save();
    console.log("password ", password);

    return res.status(200).json({ success: true, message: "user created successfully ", data: newUser })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while creating user ", error: error })
  }
}
module.exports = { createUser }