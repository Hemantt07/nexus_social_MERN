const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min: 3,
        max:25,
    },

    lastname:{
        type: String,
        required: true,
        min: 3,
        max:25,
    },

    username:{
        type: String,
        required: true,
        min: 3,
        max:25,
    },

    email:{
        type: String,
        required: true,
        min: 50,
        unique: true
    },

    password:{
        type: String,
        required: true,
        min: 6
    },
    
    profilePicture:{
        type: String,
        default: '',
    },
    
    coverPicture:{
        type: String,
        default: '',
    },

    followers:{
        type: Array,
        default: [],
    },

    followings:{
        type: Array,
        default: [],
    },

    isAdmin:{
        type: Boolean,
        default: false,
    },

    desc:{
        type: String,
        max: 50
    },

    city:{
        type: String,
        max: 50
    },

    from:{
        type: String,
        max: 50
    },

    relationship:{
        type: Number,
        enum: [1,2,3]
    },

    sex:{
        type: Number,
        enum: [1,2,3]
    },

    dob:{
        type: String,
        max: 50
    }

  },
    { timestamps: true }
);

module.exports = mangoose.model('User', userSchema);