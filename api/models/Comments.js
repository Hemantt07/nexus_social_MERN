const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
    }, 
    postId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 500,
    },
    likes:{
        type: Array,
        default: [],
    }
  },
    { timestamps: true }
);

module.exports = mangoose.model('Comments', commentSchema);