import axios from 'axios'

class ServerHelper {
   
    constructor () {
        this.baseUrl = "http://localhost:8081"
    }
    
    setBaseUrl (baseUrl) {
        this.baseUrl = baseUrl
    }

    logon (userName) {
        axios.get(this.baseUrl + '/logon/' + userName)
        .then(response => console.log(response))
        .catch(error => console.log('ERROR', error))
    }

}


// Singleton
const singleton = new ServerHelper();
export default singleton;
