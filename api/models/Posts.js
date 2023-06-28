const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        required: true,
        type: String,
        max: 500,
    },
    img:{
        type: String,
    },
    likes:{
        type: Array,
        default: [],
    }
  },
    { timestamps: true }
);

module.exports = mangoose.model('Posts', postSchema);