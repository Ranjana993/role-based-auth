const mongoose = require("mongoose")

const RouterPermissionSchema = mongoose.Schema({
  router_endpoint: {
    type: String,
    required: true
  },
  role:{
    type: Number, //0,1,2,3
    required:true,
    default:0
  },
  permission_id:{
    type:mongoose.Types.ObjectId,
    ref:"Permission",
    required:true
  },
  permission:{
    type: Array,  // 0,1,2,3,
    required: true,
  }
})

const RouterPermission = mongoose.model('RouterPermission', RouterPermissionSchema)

module.exports = RouterPermission