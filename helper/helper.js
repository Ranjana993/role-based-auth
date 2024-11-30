const User = require("../models/user_model")
const mongoose = require("mongoose");
const RouterPermission = require("../models/routerPermissionModel")

const getUserPermission = async (user_id) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(user_id)
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
    return user[0]

  } catch (error) {
    console.log("error in getuserpermission helper ", error.message);
  }
}

const getRouterPermission = async (router, role) => {
  try {
    const routerPermission = await RouterPermission.findOne({
      router_endpoint: router,
      role
    }).populate("permission_id")
    return routerPermission

  } catch (error) {
    console.log("error in getRouterPermission");
    return null;
  }
}


module.exports = { getUserPermission, getRouterPermission }