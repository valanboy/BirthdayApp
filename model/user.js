const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    required: [true, ' must have a username'],
  },

  birthDay: {
    type: Date,
  },
  gender: String,
  isOther: {
    type: Boolean,
    default: false,
  },
  otherPerson: {
    type: String,
    default: '',
  },
});

const userModel = mongoose.model('reminder', userSchema);
module.exports = userModel;
