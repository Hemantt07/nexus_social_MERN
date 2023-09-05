const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    conversationId :{
        type: String
    },
    senderId :{
        type: String
    },
    content: {
        type: String
    },
    read :{
      type: Boolean,
      default: false
    }
  },
    { timestamps: true }
);

module.exports = mangoose.model('Messages', messagesSchema);