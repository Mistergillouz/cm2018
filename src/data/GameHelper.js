import axios from 'axios'
import Constants from '../data/Constants'

class GameHelper {
   
    constructor () {
        this.baseUrl = null
        this.bets = null
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
                    this.setServerUserData(result.data)
                    resolve(result.data)
                })
                .catch(result => reject(result))
        })
    }

    loadResults () {
        return axios.get(this.baseUrl + '/results')
    }
    
    submitResults (results) {
        return axios.post(this.baseUrl + '/results', { results })
    }

    setGroupBet (groupKey, selectedCountries) {
        this.setBet(Constants.PHASES.QUALIF, selectedCountries, groupKey)
    }

    
    getGroupBets () {
        let result = {}
        const bets = this.getBet(Constants.PHASES.QUALIF)

        this.getGroups().forEach(groupId => {
            result[groupId] = []
            this.getGroup(groupId).forEach(countryId => {
                if (bets.indexOf(countryId) !== -1) {
                    result[groupId].push(countryId)
                }
            })
        })

        return result
    }

    getBets () {
        return this.bets || {}
    }

    getBet (bet) {
        return this.bets[bet.key] || []
    }

    setBet (bet, selection) {
        this.bets[bet.key] = selection
        this.checkBets()
    }

    checkBets () {
        // Check if selection is valid else remove invalid entries
        const phases = Object.values(Constants.PHASES)
        for (let i = 0; i < phases.length - 1; i++) {
            const bets0 = this.getBet(phases[i])
            let bets1 = this.getBet(phases[i + 1])
            for (let j = bets1.length - 1; j >= 0; j--) {
                if (bets0.indexOf(bets1[j]) === -1) {
                    bets1.splice(j, 1)
                }
            }
        }
    }

    getFinaleGroups () {
        let groups = {}, bets = Object.values(Constants.PHASES)
        bets.forEach((bet, index) => {
            if (index > 0) {
                groups[bet.key] = this.getBet(bets[index - 1])
            }
        })

        return groups
    }

    setFinaleTeam (finale, team) {
        if (!this.userDatas.finales) {
            this.userDatas.finales = {}
        }
        this.userDatas.finales[finale] = team
    }

    getFinaleTeams (finale) {
        if (!this.userDatas.finales) {
            this.userDatas.finales = {}
        }
        return this.userDatas.finales[finale] || []
    }

    isSubmitAllowed () {
        return this.isLogged() && !this.readOnly
    }

    isLogged () {
        return !!this.userName
    }

    isBetsCompleted () {
        return Object.values(Constants.PHASES).every(bet => this.getBet(bet).length === bet.selectionCount)
    }

    submitBets () {
        return axios.post(this.baseUrl + '/bets/' + this.userName, { bets: this.bets })
    }

    setServerUserData (data) {
        this.bets = data.bets
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

    getImagePath (id) {
        return 'assets/images/' + id + '.png';
    }
    getCountry (id) {
        return Constants.COUNTRIES[id]
    }

    getGroup (id) {
        return Constants.GROUPS[id]
    }
    getGroups () {
        return Object.keys(Constants.GROUPS)
    }

    updateStoredInfos () {
        try {
            let datas = { userName: this.getUserName() }
            localStorage.setItem('cm2018', JSON.stringify(datas))
        } catch (e) {
            // Do nothing
        }
    }

}


// Singleton
const GameHelperSingleton = new GameHelper();
export default GameHelperSingleton;
