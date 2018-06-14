var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');

var htmlPath = path.join(__dirname, '/');

app.use(express.static(htmlPath));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const DATA_FILE = 'serverdatas.json'
const END_DATE_TIME = new Date(2018, 5, 14, 17, 30, 0)
const DATAS = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))

app.get('/users', function (req, res) {
    let users = Object.keys(DATAS.users)
    res.end(JSON.stringify(users))
})

app.get('/bets', function (req, res) {
    res.end(JSON.stringify(DATAS.users))
})

app.get('/results', function (req, res) {
    
    const userPhases = {
        QUALIF: { count: 16, points: 1 },
        HUITIEME: { count: 8, points: 2 },
        QUART: { count: 4, points: 4 },
        DEMI: { count: 2, points: 8 },
        FINALE: { count: 1, points: 16 }
    }

    let userResults = {}
    const results = DATAS.results
    getUsers().forEach(user => {

        let completed = false, score = -1

        const bets = getUserBets(user)
        if (bets) {
            completed = Object.keys(userPhases).every(phase => {
                return Array.isArray(bets[phase]) && bets[phase].length == userPhases[phase].count
            })

            if (results) {
                score = Object.keys(userPhases).reduce((currentScore, phase) => {
                    let phaseScore = 0
                    if (Array.isArray(results[phase]) && Array.isArray(bets[phase])) {
                        phaseScore = results[phase].reduce((acc, countryId) => bets[phase].indexOf(countryId) === -1 ? acc : acc + userPhases[phase].points, 0)
                    }
                    return currentScore + phaseScore
                }, 0)
            }
        }
        
        userResults[user] = { user, bets, completed, score }
    });

    res.end(JSON.stringify({ users: userResults, results, stats: getStats() }))
})

function getStats () {
    
    const phases = [ 'QUALIF' , 'HUITIEME', 'QUART', 'DEMI', 'FINALE', 'WINNER' ]
    
    let countriesBetsPerPhase = {}
    getUsers().forEach(user => {
        const userBets = getUserBets(user)
        if (userBets) {
            for (let i = 0; i < phases.length - 1; i++) {
                const phase = phases[i]
                if (Array.isArray(userBets[phase])) {
                    const targetPhase = phases[i + 1]
                    if (!countriesBetsPerPhase[targetPhase]) {
                        countriesBetsPerPhase[targetPhase] = {}
                    }
                    userBets[phase].forEach(country => {
                        if (!countriesBetsPerPhase[targetPhase][country]) {
                            countriesBetsPerPhase[targetPhase][country] = []
                        }
                        countriesBetsPerPhase[targetPhase][country].push(user)
                    })
                }
            }
        }
    })

    return { counts: countriesBetsPerPhase }
}

app.get('/logon/:user', function (req, res) {
    const user = DATAS.users[req.params.user]
    if (user) {
        let result = {
            bets: user.bets || {},
            readOnly: !isBetAllowed(),
            qualification: DATAS.qualification
        }
        res.end(JSON.stringify(result))
    } else {
        res.sendStatus(404)
    }
})

app.post('/bets/:user', function (req, res) {

    if (!isBetAllowed()) {
        res.status(500).send('Update are now disabled')
        return
    }

    let user = DATAS.users[req.params.user]
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
    writeDATAS()
})

var server = app.listen(9000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

function writeDATAS () {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DATAS))
}

function getUsers () {
    return Object.keys(DATAS.users).sort()
}

function getUserBets (userName) {
    return DATAS.users[userName].bets
}

function isBetAllowed () {

    if (!DATAS.readOnly) {
        return Date.now() < END_DATE_TIME.getTime()
    }

    return false
}
