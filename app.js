var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    // fileUpload = require('express-fileupload');       
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({}));
// app.use(fileUpload(
//     {
//         useTempFiles : true
//     }
// ));

// API endpoints
app.use("/api/employee",require("./controllers/employee"));

module.exports = app;