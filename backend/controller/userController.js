const userModel = require("../model/userModel")
const MyPass = require("../utils/myPassword")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const registration =async (req,res) =>{
    const { fname, lname, mobile, address, city, email} = req.body;
    const password = MyPass.passGenerate();
   
try {

    const hashPassword = await bcrypt.hash(password, 10);
    let cust = await userModel.create({
        firstname:fname,
        lastname:lname,
        mobile:mobile,
        address:address,
        city:city,
        email:email,
        password:hashPassword
    })
  


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sudhanshkr04@gmail.com',
    pass: 'ypnv vspk hiri uwwd'
  }
});

var mailOptions = {
  from: 'sudhanshkr04@gmail.com',
  to: email,
  subject: 'Account created SuccessFully',
  text: `Hello ${fname}, Your account has been created successfully \n Your password for account is ${password}`
};

await transporter.sendMail(mailOptions);


res.status(200).send("data saved & email Send") 
} catch (error) {
    res.status(400).send(error)
}  
}


const Login = async(req,res)=>{
    const {email,password}= req.body;
    try {
        let Customer = await userModel.findOne({email:email})

    if(!Customer)
    {
        return res.status(400).send("Invalid Email")
    }

    const isMatch = await bcrypt.compare(password, Customer.password);
        if (!isMatch) {
            return res.status(400).send("Invalid Password");
        }

    
    const token = await jwt.sign({id:Customer._id}, process.env.SECRET_KEY, {expiresIn:"7 days"})
    console.log(token);
    res.send({token, "customer":Customer});
        
    } catch (error) {
        res.status(400).send(error)
    }
}

    const Authentication = async(req,res)=>{
    const token = req.header("x-auth-token");
    console.log(token);
    const verify = await jwt.verify(token,process.env.SECRET_KEY)
    console.log(verify);
    const User = await userModel.findById(verify.id).select("-password")
    res.send(User)
}

module.exports = {
    registration,
    Login,
    Authentication
}
