const express = require('express');
const app = express();
const fs = require("fs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);

let serverDatas = JSON.parse(fs.readFileSync('serverdatas.json', 'utf8'))
console.log(serverDatas)

app.get('/users', function (req, res) {
   let users = Object.keys(serverDatas.users)
   res.end(JSON.stringify(users))
})

app.get('/logon/:user', function (req, res) {
    const userData = serverDatas.users[req.params.user]
    if (userData) {
        const result = {
            step: serverDatas.step,
            bets: userData
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

    res.sendStatus(200)

})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})