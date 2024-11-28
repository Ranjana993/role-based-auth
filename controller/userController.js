const randomString = require("randomstring")
const User = require("../models/user_model")
const bcrypt = require("bcrypt")
const sendMailer = require("../helper/mailer")
const mongoose = require("mongoose");
const Permission = require("../models/permission_model")
const UserPermission = require("../models/user_permission_model")


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
      return res.status(400).json({ success: false, message: "You can't create admin" })
    }
    else if (req.body.role) {
      obj.role = req.body.role
    }

    const user = new User(obj);
    const newUser = await user.save();
    if (req.body.permissions != undefined && req.body.permissions.length > 0) {
      const permissionArray = [];
      const addPermissionData = req.body.permissions

      await Promise.all(addPermissionData.map(async (permission) => {
        const permissionData = await Permission.findOne({ _id: permission.id })
        // console.log("permissionData", permissionData); 
        
        permissionArray.push({
          permission_name: permissionData.permission_name,
          permission_value: permission.value
        })
      }))
      const userPermission = new UserPermission({ user_id: newUser._id, permission: permissionArray })
      await userPermission.save();
    }



    const content = `
    <p>Hii <b> `+ newUser.name + ` ,</b> Your account has been created , below is your details  </p>
    <Table style=""border-style:none>
    <tr>
      <th>Name :- </th>
      <td>`+ newUser.name + ` </td>
    </tr>
        <tr>
      <th>Email :- </th>
      <td>`+ newUser.email + ` </td>
    </tr>
    <tr>
      <th>Password :- </th>
      <td>`+ password + ` </td>
    </tr>
    </table>
    <p>Now you can login  and Enjoy a great experience , 
    Thanks </p>
`


    await sendMailer(newUser.email, "Account created ", content)
    // console.log("Account created successfully ")
    return res.status(200).json({ success: true, message: "user created successfully ! ", data: newUser })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while creating user ", error: error })
  }
}


const getUser = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(req.user._id)
          }
        }
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
    return res.status(200).json({ success: true, message: "Successfully fetched user ", data: users })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while getting user ", error: error })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id, name, role } = req.body;

    // Check if the user exists
    const isExist = await User.findOne({ _id: id });

    if (!isExist) {
      return res.status(400).json({ success: false, message: "User does not exist!" });
    }

    // Prepare the update object
    const updateObj = {};
    if (name) updateObj.name = name;
    if (role !== undefined) updateObj.role = role;

    // Update user data
    const updatedData = await User.findByIdAndUpdate(
      id,               
      { $set: updateObj }, 
      { new: true }        
    );

    // add  comiing permissions 
    if (req.body.permissions != undefined && req.body.permissions.length > 0) {
      const permissionArray = [];
      const addPermissionData = req.body.permissions

      await Promise.all(addPermissionData.map(async (permission) => {
        const permissionData = await Permission.findOne({ _id: permission.id })
        // console.log("permissionData", permissionData); 

        permissionArray.push({
          permission_name: permissionData.permission_name,
          permission_value: permission.value
        })
      }))
      const userPermission = new UserPermission({ user_id: updatedData._id, permission: permissionArray })
      await userPermission.save();
    }

    if (!updatedData) {
      return res.status(500).json({ success: false, message: "Failed to update user data." });
    }

    // console.log("Updated Data:", updatedData);

    // Send success response
    return res.status(200).json({ success: true, message: "User data updated successfully!", newData: updatedData });

  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({ success: false, message: "Error while updating user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the user exists
    const isExist = await User.findOne({ _id: id });

    if (!isExist) {
      return res.status(400).json({ success: false, message: "User does not exist!" });
    }

    await User.findByIdAndDelete({ _id: id })
    return res.status(200).json({ success: true, message: "User data deleted successfully!" });

  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ success: false, message: "Error while deleting user", error: error.message });
  }
}




module.exports = { createUser, getUser, updateUser, deleteUser }