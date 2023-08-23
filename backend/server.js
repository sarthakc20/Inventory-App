const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Config
dotenv.config({path:"backend/config.env"});

// Connecting to MongoDB
mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});