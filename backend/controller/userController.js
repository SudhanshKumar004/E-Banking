const userModel = require("../model/userModel")
const MyPass = require("../utils/myPassword")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const transactionsModel = require("../model/transactionsModel");



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
    res.send({token, "customer":Customer});
        
    } catch (error) {
        res.status(400).send(error)
    }
}

    const Authentication = async(req,res)=>{
    const token = req.header("x-auth-token");
    const verify = await jwt.verify(token,process.env.SECRET_KEY)
    const User = await userModel.findById(verify.id).select("-password")
    res.send(User)
}



const PassReset = async (req, res) => {
    const { custId } = req.body;
    
    try {

        const user = await userModel.findById(custId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const password = MyPass.passGenerate();
        const hashPassword = await bcrypt.hash(password, 10);

        await userModel.findByIdAndUpdate(custId, { password: hashPassword });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sudhanshkr04@gmail.com',
                pass: 'ypnv vspk hiri uwwd' 
            }
        });

        const mailOptions = {
            from: 'sudhanshkr04@gmail.com',
            to: user.email,
            subject: 'Password Reset Successful',
            text: `Dear ${user.firstname},\n\nYour password has been reset successfully.\nYour New Password is: ${password}\n\nFor security, please keep it safe 😊!`
        };

        await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
    } else {
        console.log("Email sent:", info.response);
    }
});


        res.status(200).json({ message: "Password reset & email sent successfully" });

    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const AccInfo = async (req,res)=>{
    const {custid} = req.body;
    
    try {

        let Info = await userModel.findById(custid)

        if (!Info) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(Info);
        
    } catch (error)
     {
        res.status(400).send({message:"Error Loading Data"})
    }
}

const MoneyTransaction = async (req, res) => {
    const { amount, custid, status } = req.body;

    try {
        let transaction = await transactionsModel.create({
            customerid: custid,
            amount: amount,
            status: status
        });

        if (!transaction) {
            return res.status(400).send({ msg: "Transaction Failed!" });
        }

        if (status === "debit") {
            res.status(200).send({ msg: "Withdrawal Successful!" });
        } else {
            res.status(200).send({ msg: "Amount Added Successfully!" });
        }

    } catch (error) {
        res.status(400).send({ msg: "Something went wrong :(" });
    }
};

const BalanceQuiry = async(req,res)=>{
    const { custid } = req.body;
   
    try {
         const Balance = await transactionsModel.find({customerid:custid})
         res.status(200).send({"records":Balance})
    }
    
    catch (error) {
        res.status(400).send({msg:"Error Fetching Data"})
    }
}

module.exports = {
    registration,
    Login,
    Authentication,
    PassReset,
    AccInfo,
    MoneyTransaction,
    BalanceQuiry
}
