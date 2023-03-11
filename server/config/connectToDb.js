// Load env variables 

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


const mongoose = require("mongoose"); 
async function connectTodb() {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectTodb; 