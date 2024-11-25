const mongoose = require("mongoose")

const PermissionSchema = mongoose.Schema({
  permission_name: {
    type: String,
    required: true
  },
  is_default: {
    type: Number,
    default: 0  // 0 not default and 1 => default
  }
})

const Permission = mongoose.model('Permission', PermissionSchema)

module.exports = Permission