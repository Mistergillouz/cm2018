import axios from 'axios'
import * as GAMEDATAS from './data.json'

class GameHelper {
   
    constructor () {
        this.baseUrl = null
        this.userDatas = null
    }

    init (baseUrl) {

        this.baseUrl = baseUrl

        return new Promise((resolve, reject) => {

            try {
                let storedInfos = JSON.parse(localStorage.getItem('cm2018'))
                this.logon(storedInfos.userName).then(result => resolve(result)).catch(result => reject(result))
            } catch (e) {
                reject(e)
            }
        })
    }
    
    logon (userName) {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + '/logon/' + userName)
                .then(result => {
                    this.setUserName(userName)
                    this.setUserData(result.data)
                    resolve(result.data)
                })
                .catch(result => reject(result))
        })
    }

    isSubmitAllowed () {
        return this.isLogged() && !this.readOnly
    }
    isLogged () {
        return !!(this.userName && this.userDatas)
    }

    saveGroupBets () {
        this.buildMatches()
        return axios.post(this.baseUrl + '/groupBets/' + this.userName, { groupBets: this.userDatas.groupBets })
    }

    setUserData (data) {
        this.userDatas = data.userDatas
        this.readOnly = data.readOnly
        this.qualification = data.qualification
    }

    setUserName (userName) {
        this.userName = userName
        this.updateStoredInfos()
    }

    getUserName () {
        return this.userName
    }

    setGroupBet (groupKey, countryId) {
        let groupBets = this.getGroupBets(groupKey)
        let index = groupBets.indexOf(countryId)
        if (index === -1) {
            groupBets.push(countryId)
        } else {
            groupBets.splice(index, 1)
        }

        if (groupBets.length > 2) {
            groupBets.splice(0, groupBets.length - 2)
        }
    }

    getImagePath (id) {
        return 'assets/images/' + id + '.png';
    }
    getCountry (id) {
        return GAMEDATAS.codePays[id]
    }

    getGroup (id) {
        return GAMEDATAS.groupes[id]
    }
    getGroups () {
        return GAMEDATAS.groupes
    }

    getGroupBets (id) {
        if (!this.userDatas.groupBets) {
            this.userDatas.groupBets = {}
        }

        let bets = this.userDatas.groupBets[id]
        if (!bets) {
            bets = this.userDatas.groupBets[id] = []
        }
        return bets
    }

    updateStoredInfos () {
        try {
            let datas = { userName: this.getUserName() }
            localStorage.setItem('cm2018', JSON.stringify(datas))
        } catch (e) {
            // Do nothing
        }
    }

    buildMatches (step) {

        // 8eme
        const table = [
            [ 'A1B2', 'C1D2'],
            [ 'B1A2', 'D1C2'],
            [ 'E1F2', 'G1H2'],
            [ 'F1E2', 'H1G2']
        ]

        let matches = []
        table.forEach((entry, index) => {
            entry.forEach(match => {
                matches.push({
                    index: index,
                    teams: [ 
                        this._teamCode(match.substr(0, 2)), 
                        this._teamCode(match.substr(2))]
                })
            })
        })
    }

    _teamCode (teamCode) {
        let bet = this.getGroupBets(teamCode.charAt(0));
        return bet[Number(teamCode.charAt(1)) - 1]
    }
}

// Singleton
const GameHelperSingleton = new GameHelper();
export default GameHelperSingleton;
