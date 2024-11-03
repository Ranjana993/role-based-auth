const Permission = require("../../models/permission_model");

const addPermission = async (req, res) => {
  try {
    const { permission_name, _is_default } = req.body;

    // Check if permission name is provided
    if (!permission_name) {
      return res.status(401).json({ success: false, message: "Please add permission name" });
    }

    // Check if the permission already exists
    const isExisting = await Permission.findOne({ permission_name });
    if (isExisting) {
      return res.status(400).json({ success: false, message: "Permission name already exists" });
    }

    // Create permission object
    const obj = { permission_name };

    // Add _is_default if provided and valid
    if (_is_default !== undefined) {
      obj._is_default = parseInt(_is_default) || 0;
    }

    // Save the new permission
    const newPermission = new Permission(obj);
    const newPermissionData = await newPermission.save();

    return res.status(200).json({ success: true, message: "Permission saved successfully", data: newPermissionData });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error while adding new permission", error });
  }
};

module.exports = {
  addPermission
};
