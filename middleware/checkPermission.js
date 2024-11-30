const { getRouterPermission, getUserPermission } = require("../helper/helper");


const checkPermission = async (req, res, next) => {
  try {
    if (req.user.role != 1) {
      const routerPermission = await getRouterPermission(req.path, req.user.role)
      const userPermission = await getUserPermission(req.user._id)
      if (userPermission.permissions.permissions === undefined || !routerPermission) {
        return res.status(400).json({ success: false, message: "You don't have permission to access this route ", error: error.message });
      }

      const permission_name = routerPermission.permission_id.permission_name
      const permission_values = routerPermission.permission
      
      const hasPermission = userPermission.permissions.permissions.some((permission) => {
        permission.permission_name == permission_name && permission.permission_values.some((value) => {
          permission_values.includes(value)
        })
      })

      if (!hasPermission){
        return res.status(400).json({ success: false, message: "You don't have permission to access this route ", error: error.message });
      }
    }
    return next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error in checkPermission function ", error: error.message });
  }
}

module.exports = checkPermission