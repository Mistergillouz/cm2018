var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');

var htmlPath = path.join(__dirname, '/');

app.use(express.static(htmlPath));

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

app.get('/bets', function (req, res) {
    res.end(JSON.stringify(serverDatas.users))
})

app.get('/bets/:user', function (req, res) {
    const user = serverDatas.users[req.params.user]
    if (user) {
        res.end(JSON.stringify(user))
    } else {
        res.sendStatus(404)
    }
})

app.get('/logon/:user', function (req, res) {
    const user = serverDatas.users[req.params.user]
    if (user) {
        let result = {
            bets: user.bets || {},
            readOnly: serverDatas.readOnly,
            qualification: serverDatas.qualification
        }
        res.end(JSON.stringify(result))
    } else {
        res.sendStatus(404)
    }
})

app.post('/bets/:user', function (req, res) {

    if (serverDatas.readOnly) {
        res.status(500).send('Update are now disabled')
        return
    }

    let user = serverDatas.users[req.params.user]
    if (!user) {
        res.sendStatus(404)
        return
    }

    if (!req.body.bets) {
        res.status(500).send('Cannot find bets attribute')
        return
    }

    user.bets = req.body.bets
    user.date = new Date().toISOString()
    
    res.sendStatus(200)
    writeServerDatas()
})

var server = app.listen(9000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

function writeServerDatas () {
    fs.writeFileSync(DATA_FILE, JSON.stringify(serverDatas))
}