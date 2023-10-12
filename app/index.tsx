/* @refresh reload */

import { render } from 'solid-js/web'
import { Router, Routes, Route } from '@solidjs/router'

import 'solid-devtools'

import './index.scss'
import { lazy } from 'solid-js'
import { UserData } from './shared'

render(
    () => (
        <Router>
            {/*<div style={{ display: 'flex', gap: '1rem' }}>
                <A href='/admin/'>admin</A>
                <A href='/dash/'>dash</A>
            </div>*/}
            <Routes>
                <Route
                    path='/dash/'
                    component={lazy(() => import('./dash'))}
                    data={UserData}
                />
                <Route
                    path='/admin/'
                    component={lazy(() => import('./admin'))}
                    data={UserData}
                />
            </Routes>
        </Router>
    ),
    document.getElementById('root')
)
