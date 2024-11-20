const Role = require("../models/role_model")

const storeRole = async (req, res) => {
  try {
    const { role_name, value } = req.body
    const role = new Role({ role_name, value })
    const newRole = await role.save();
    return res.status(200).json({ succes: true, message: "Role created succcessfully", data: newRole })


  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while storing role ", error: error.message })
  }
}


const getRole = async (req, res) => {
  try {
    const allRoles = await Role.find({ value: { $ne: 1 } })
    return res.status(200).json({ succes: true, message: "Role fetched succcessfully", data: allRoles })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while getting role ", error: error.message })
  }
}

module.exports = { storeRole, getRole }