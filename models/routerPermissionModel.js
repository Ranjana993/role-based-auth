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
  permission:{
    type: Number,  // 0,1,2,3,
    required: true,
  }
})

const RouterPermission = mongoose.model('RouterPermission', RouterPermissionSchema)

module.exports = RouterPermission