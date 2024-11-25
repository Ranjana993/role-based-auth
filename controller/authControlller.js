const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User_Permission = require("../models/user_permission_model");
const Permission = require("../models/permission_model");
const User = require("../models/user_model");


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!(name && email && password)) {
      return res.status(400).json({ message: "Please enter all required information." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists with this email address." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user
    const userData = await user.save();

    const defaultPermission = await Permission.find({ is_default: 1 })

    if (defaultPermission.length > 0) {
      var permissionArray = [];
      defaultPermission.forEach(permission => {
        permissionArray.push({
          permission_name: permission.permission_name,
          permission_value: [0, 1, 2, 3]
        })
      })
      console.log("defaultPermission", defaultPermission);



      const userPermission = new User_Permission({
        user_id: userData.id,
        permission: permissionArray
      })
      await userPermission.save();
    }
    //  assiging default persmissios
    return res.status(201).json({ message: "User registered successfully", data: userData });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server error while registering user." });
  }
};


const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACESS_SECRET_TOKEN, {
    expiresIn: '2h'
  })
  return token;
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    // Check if user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found with this email ID" });
    }

    // Compare the entered password with the stored hashed password
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const accessToken = await generateAccessToken({ user: existingUser })

    const result = await User.aggregate([
      {
        $match: { email: existingUser.email }
      },
      {
        $lookup: {
          from: "userpermissions",
          localField: "_id",
          foreignField: "user_id",
          as: "permissions"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          permissions: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: { $arrayElemAt: ["$permissions", 0] },
              else: null
            }
          },
        }
      },
      {
        $addFields: {
          "permissions": {
            "permissions": "$permissions.permissions"
          }
        }
      }
    ])
    console.log("result", result);

    // Login successful
    return res.status(200).json(
      {
        success: true,
        message: "Successfully logged in",
        data: result[0],
        token: accessToken,
        tokenType: 'Bearer'
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Error while logging in user", error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const userData = await User.findOne({ _id: user_id, })
    console.log(req);

    return res.status(200).json({ success: true, message: "Successfully got your profile", data: userData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while getting profile" });
  }
}


module.exports = {
  registerUser,
  loginUser,
  getProfile
};
