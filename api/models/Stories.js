const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const storySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    storyImg:{
        type: String,
    },
    views:{
        type: Array,
        default: [],
    }
  },
    { timestamps: true }
);

module.exports = mangoose.model('Stories', storySchema);