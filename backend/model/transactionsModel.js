const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

    amount:Number,

    status:String,

    description:String,
    
    customerid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accountHolder'
    },
    
    transactionDate:{
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model("transaction", transactionSchema)