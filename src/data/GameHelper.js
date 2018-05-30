import axios from 'axios'
import * as GAMEDATAS from './data.json'

class GameHelper {
   
    constructor () {
        this.baseUrl = null
        this.userDatas = null

        try {
            let storedInfos = JSON.parse(localStorage.getItem('cm2018'))
            this.logon(storedInfos.userName)
        } catch (e) {}
    }
    
    setBaseUrl (baseUrl) {
        this.baseUrl = baseUrl
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

    saveGroupBets () {
        return axios.post(this.baseUrl + '/groupBets/' + this.userName, { groupBets: this.userDatas.groupBets })
    }

    setUserData (data) {
        this.userDatas = data.userDatas
        this.stage = data.stage
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
    }

    getImagePath (id) {
        return 'assets/images/' + id + '.gif';
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
        } catch (e) {}
    }
}


// Singleton
const GameHelperSingleton = new GameHelper();
export default GameHelperSingleton;
