const mongoose = require("mongoose")

const userPermissionSchema = mongoose.Schema({
  permission_name: {
    type: String,
    required: true
  },
  is_default: {
    type: Number,
    default: 0  // 0 not default and 1 => default
  }
})

const Permission = mongoose.model('userPermission', userPermissionSchema)

module.exports = Permission