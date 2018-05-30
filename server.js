const express = require('express');
const app = express();
const fs = require("fs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);

const DATA_FILE = 'serverdatas.json'
let serverDatas = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))

app.get('/users', function (req, res) {
    let users = Object.keys(serverDatas.users)
    res.end(JSON.stringify(users))
})


app.get('/logon/:user', function (req, res) {
    const userDatas = serverDatas.users[req.params.user]
    if (userDatas) {
        let result = {
            userDatas: userDatas,
            stage: serverDatas.stage,
            qualification: serverDatas.qualification
        }
        res.end(JSON.stringify(result))
    } else {
        res.sendStatus(404)
    }
})

app.post('/groupbets/:user', function (req, res) {
    let userData = serverDatas.users[req.params.user]
    if (!userData) {
        res.sendStatus(404)
        return
    }

    if (!req.body.groupBets) {
        res.status(500).send('Cannot find groupBets attribute')
        return
    }

    userData.groupBets = req.body.groupBets
    res.sendStatus(200)
    writeServerDatas()
})

var server = app.listen(9001)

function writeServerDatas () {
    fs.writeFileSync(DATA_FILE, JSON.stringify(serverDatas))
}

console.log(__dirname)
