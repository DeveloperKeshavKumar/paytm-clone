const mongoose = require('mongoose');

exports.connectDB = () =>{
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected to database successfully"))
    .catch((err)=> {
        console.log("Issue in DB connection");
        console.error(err);
        process.exit(1);
    })
};