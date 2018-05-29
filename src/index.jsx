import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import GameHelper from './data/GameHelper'

GameHelper.setBaseUrl('http://' + document.location.hostname + ':9001')
GameHelper.setUserName('Gillouz')

GameHelper.logon('Gillouz').finally(result => render(<App message='Gillouz'/>, document.getElementById('app-root')))