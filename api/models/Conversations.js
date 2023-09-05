const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const conversationsSchema = new mongoose.Schema({
    members :{
        type: Array,
        default: [],
        required: true
    }
  },
    { timestamps: true }
);

module.exports = mangoose.model('Conversations', conversationsSchema);