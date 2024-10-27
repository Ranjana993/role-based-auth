const mongoose = require("mongoose")

const PermissionSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
    ref: 'User'
  },
  permission: [
    {
      permission_name: String,
      permission_value: [Number]
    }
  ]

})

const Permission = mongoose.model.model('User', PermissionSchema)

module.exports = Permission