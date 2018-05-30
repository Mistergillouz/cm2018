import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import GameHelper from './data/GameHelper'

GameHelper.setBaseUrl('http://' + document.location.hostname + ':9001')
render(<App message='Gillouz'/>, document.getElementById('app-root'))