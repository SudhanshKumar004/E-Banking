const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
     firstname: {
        type: String,
        require: true
    },
    
    lastname: {
        type: String,
        require: true
    },
     
    mobile: {
        type: String,
        require: true
    },
     
    address: {
        type: String,
        require: true
    },

    city: {
        type: String,
        require: true
    },
    
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase:true
    },

    password:{
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now
  }
})

module.exports = mongoose.model("/accountHolder", userSchema)