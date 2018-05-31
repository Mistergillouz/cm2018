import * as React from 'react'
import { render } from 'react-dom'

import GameHelper from './data/GameHelper'
import App from './components/App'

GameHelper.init('http://' + document.location.hostname + ':9000')
    .finally(result => render(<App isLogged={ GameHelper.isLogged() }/>, document.getElementById('app-root')))


