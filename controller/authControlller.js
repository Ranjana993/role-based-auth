const User = require("../models/user_model")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    console.log(req.body);
    
    if (!(name && email && password)) {
      res.status(201).json({ message: "please enter your all information  " })
    }
    const isEsistingUser = await User.find({ email });
    if (isEsistingUser) {
      res.status(202).json({ messgae: "User already exists with this email address" });
    }
    const hashedPassword = await bcrypt.hash(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })
    newUser.save()
    res.status(200).json({ message: "User saved successfully", data: newUser })
  } catch (error) {
    res.status(500).json({ message: "Server side error while registering user " })
  }
}

module.exports = {
  registerUser
}