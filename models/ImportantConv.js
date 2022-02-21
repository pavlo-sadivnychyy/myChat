const mongoose = require('mongoose');

const ImportantConvListSchema = new mongoose.Schema({
  conversations: {
    type: Array
  },
  _id: {
    type: String
  },
  userId: {
    type: String
  },
}, {timestamps: true})

module.exports = mongoose.model("ImportantConvList", ImportantConvListSchema)
