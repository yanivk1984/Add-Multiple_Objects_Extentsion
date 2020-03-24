const express = require('express');
const https = require('https');
const fs = require('fs');
const port = 8000;
const path = require('path');



var key = fs.readFileSync(__dirname + '/key.pem');
var cert = fs.readFileSync(__dirname + '/cert.pem');
var options = {
    key: key,
    cert: cert
};

let app = express();

app.use(express.static('production'));

app.get('/json', (req, res) => {
    res.sendFile(path.join(__dirname, "production", "extension.json"));
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "production", "index.html"));
});


var server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});
