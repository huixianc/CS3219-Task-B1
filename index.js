// import Express and create app
const express = require('express');
const app = express();
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


// send message for default url
app.get('/', (req, res) => {
    res.send('Hello World! :)');
});


// Import routes
let apiRoutes = require("./api-routes")
// Use Api routes in the App
app.use('/api', apiRoutes)

const port = process.env.PORT || 3000;
// launch app to listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));  