import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import ServerHelper from './data/ServerHelper'

render(<App message='Gillouz'/>, document.getElementById('app-root'))

ServerHelper.logon('Gillouz')