const userModel = require("../model/userModel")
const MyPass = require("../utils/myPassword")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const transactionsModel = require("../model/transactionsModel");
const accNo = require("../utils/AccNo")



const registration =async (req,res) =>{
    const { fname, lname, mobile, address, city, email} = req.body;
    const password = MyPass.passGenerate();
    const accNumber = accNo.accNoGenerate();

    let User = await userModel.findOne({email:email})

    if(User)
    {
       return res.status(400).send("Email already registered!")
    }
   
try {

    const hashPassword = await bcrypt.hash(password, 10);
    let cust = await userModel.create({
        firstname:fname,
        lastname:lname,
        mobile:mobile,
        address:address,
        city:city,
        email:email,
        password:hashPassword,
        accountNo:accNumber
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


res.status(200).send("You Are Registered SuccessFully!") 
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
    const { custId , oldpassword, newpassword, repassword} = req.body;

    try {
     let Customer = await userModel.findById(custId);

     const passMatch = await bcrypt.compare(oldpassword, Customer.password);
        
     if (!passMatch) {
            return res.status(400).send("Old Password Does Not Matched!");
        }

        
        if(newpassword != repassword)
            {
                return res.status(400).send("New Password Does Not Matched")
            }
            
            const hashPassword = await bcrypt.hash(newpassword,10);
        await userModel.findByIdAndUpdate(custId, {password:hashPassword})
        res.status(200).send("Password Updated Successfully!")
    }
    
    catch (error) {
        res.status(400).send(error)
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

    console.log(req.body);
    
    const { amount, custid, status, description } = req.body;

    try {
        let transaction = await transactionsModel.create({
            customerid: custid,
            amount: amount,
            status: status,
            description:description
        });

        if (!transaction) {
            return res.status(400).send({ msg: "Transaction Failed!" });
        }

        if (status === "debit") {
            res.status(200).send({ msg: "Withdrawal Successful!" });
        } 
        
        else {
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


const AccStatement = async (req,res) =>{
    const { custid } = req.body;

    try {
         const Statement = await transactionsModel.find({customerid:custid}).sort({transactionDate:-1}).limit(10)
         const Balance = await transactionsModel.find({customerid:custid})
         res.status(200).send({statement:Statement, balance:Balance})
         
    }
    
    catch (error) {
        res.status(400).send({msg:"Error Fetching Data"})
    }

}

const MiniStatement = async (req,res) =>{
    const {custid, fromDate, endDate} = req.body;
    try {
        if( !fromDate || !endDate)
        {
            return res.status(400).send("Both dates are required!")
        }

        const fromdate = new Date(fromDate);
        const enddate = new Date(endDate);

        if(fromdate > enddate)
        {
           return res.status(400).send("'From' Date can not be after 'To' Date");
        }

        if(fromdate.getTime() === enddate.getTime())
        {
           return res.status(400).send("Please Select two different Date!");
        }

        const transactions = await transactionsModel.find({customerid:custid,
            transactionDate:{
                $gte: fromdate,
                $lte: enddate
            }
        }).sort({transactionDate:-1})

        if(!transactions.length)
        {
           return res.status(400).send("No Transactions found.")
        }

        res.status(200).send(transactions)
    } 
    
    catch (error) {
        console.log(error);
        
        res.status(400).send("Server Error :(")
    }
}

module.exports = {
    registration,
    Login,
    Authentication,
    PassReset,
    AccInfo,
    MoneyTransaction,
    BalanceQuiry,
    AccStatement,
    MiniStatement
}
