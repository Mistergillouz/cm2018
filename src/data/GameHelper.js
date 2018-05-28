import * as GAMEDATAS from './data.json'

class GameHelper {
   
    constructor () {
    }
    
    getCountry (id) {
        return GAMEDATAS.codePays[id]
    }

    getPoule (id) {
        return GAMEDATAS.groupes[id]
    }
    getPoules () {
        return GAMEDATAS.groupes
    }
}


// Singleton
const GameHelperSingleton = new GameHelper();
export default GameHelperSingleton;
