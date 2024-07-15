const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connection successful');
    } catch (error) {
        console.log(`database error :- ${error.message}`)
    }
}

module.exports = connectdb;
