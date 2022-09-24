
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors())

app.use(bodyParser.json());



//database=============================================================
const uri = "mongodb://localhost:27017/job";
mongoose.connect(uri, { }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
//database=============================================================


//routers??????????????????????????????????????????//////////////////////////////////////////


let userRoutes = require("./routes/users")

app.use('/api/user', userRoutes)

let ApplicationsRoutes = require("./routes/Applications")

app.use('/api/applications', ApplicationsRoutes)

let jobsRoutes = require("./routes/jobs")

app.use('/api/jobs', jobsRoutes)

app.listen(process.env.port || 5000);

console.log('Web Server is listening at port http://localhost:' + (process.env.port || 5000));