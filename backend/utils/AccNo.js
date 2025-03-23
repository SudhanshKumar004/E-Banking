
const strings = "1234567890"

const accNoGenerate=()=>{
 let accNo = "PPB";

 for(let i = 0; i < 12 ;i++)
 {
        accNo += strings.charAt(Math.random() * strings.length);
 }

 return accNo;
}


 module.exports = {
    accNoGenerate
 }