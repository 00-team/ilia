/* @refresh reload */

import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'

import App from './app'

import 'solid-devtools'

import './style.scss'

const root = document.getElementById('root')

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    root
)
