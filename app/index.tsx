/* @refresh reload */

import { render } from 'solid-js/web'
import { Router, Routes, Route } from '@solidjs/router'

import 'solid-devtools'

import './index.scss'
import { lazy } from 'solid-js'
import { UserData } from './stores'

render(
    () => (
        <Router>
            <Routes>
                <Route
                    path='/dash/'
                    component={lazy(() => import('./dash'))}
                    data={UserData}
                />
                <Route
                    path='/admin'
                    component={lazy(() => import('./admin'))}
                    data={UserData}
                >
                    <Route
                        path='/'
                        component={lazy(() => import('./admin/general'))}
                    />
                    <Route
                        path='/users/'
                        component={lazy(() => import('./admin/users'))}
                    />
                </Route>
            </Routes>
        </Router>
    ),
    document.getElementById('root')
)
