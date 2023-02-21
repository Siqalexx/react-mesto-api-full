const moongose = require('mongoose');
const { validationAvatar } = require('../utils/validationAvatar');

const cardSchema = moongose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: validationAvatar,
  },
  owner: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: moongose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports.cardModel = moongose.model('card', cardSchema);
