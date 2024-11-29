const RouterPermission = require("../../models/routerPermissionModel")


const getAllRoutes = (req, res) => {
  try {
    const routes = [];
    const stack = req.app._router.stack

    stack.forEach((data) => {
      if (data.name === "router" && data.handle.stack) {
        data.handle.stack.forEach((handler) => {
          routes.push({
            path: handler.route.path,
            methods: handler.route.methods
          })
        })
      }
    })
    return res.status(200).json({
      success: true,
      "message": "all routes",
      data: routes
    })

  } catch (error) {
    console.error("Error while getting all routes:", error.message);
    return res.status(500).json({ success: false, message: "Error while getting all routes", error: error.message });
  }
}


const addRouterPermission = async (req, res) => {
  try {
    const { router_endpoint, role, permission , permission_id } = req.body
    const routerPermission = await RouterPermission.findOneAndUpdate(
      { router_endpoint, role },
      { router_endpoint, role, permission, permission_id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return res.status(200).json({ success: true, message: "Router Permission added / updated", data: routerPermission });

  } catch (error) {
    console.error("Error while adding router permission:", error.message);
    return res.status(500).json({ success: false, message: "Error while adding router permission:", error: error.message });
  }
}


const getRouterPermission = async (req, res) => {
  try {
    const { router_endpoint } = req.body;
    const routerPermission = await RouterPermission.find({ router_endpoint }).populate('permission_id')

    return res.status(200).json({ success: true, message: "All Router Permission", data: routerPermission });

  } catch (error) {
    console.error("Error while getting router permission:", error.message);
    return res.status(500).json({ success: false, message: "Error while getting router permission:", error: error.message });
  }
}



module.exports = { getAllRoutes, addRouterPermission, getRouterPermission }