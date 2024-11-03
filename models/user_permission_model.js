const mongoose = require("mongoose")

const userPermissionSchema = mongoose.Schema({
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

const userPermission = mongoose.model.model('userPermission', userPermissionSchema)

module.exports = userPermission