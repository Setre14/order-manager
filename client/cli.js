#!/usr/bin/node

const yargs = require('yargs');
const express = require("express");

const argv = yargs
    .option('port', {
        alias: 'p',
        description: 'Port for the Order Manager Client',
        type: 'number',
    })
    .help()
    .alias('help', 'h')
    .argv;


var app = express();
app.use(express.static("deploy"));
app.get("/", function (req, res, next) {
    res.redirect("/"); 
});

const port = argv.port ? argv.port : 80

app.listen(port, "localhost");
console.log("Order Manager Client stated on port " + port);
