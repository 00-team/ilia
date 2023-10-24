/* @refresh reload */

import { Navigate, Route, Router, Routes } from '@solidjs/router'
import { render } from 'solid-js/web'

import 'solid-devtools'

import './style/base.scss'
import './style/buttons.scss'
import './style/config.scss'
import './style/font/imports.scss'
import './style/theme.scss'

import { lazy } from 'solid-js'
import { UserData } from './stores'

render(
    () => (
        <Router>
            <Routes>
                <Route
                    path='/admin'
                    component={lazy(() => import('./admin'))}
                    data={UserData}
                >
                    <Route
                        path='/'
                        component={lazy(() => import('./admin/projects'))}
                    />
                    {/*<Route
                        path='/users/'
                        component={lazy(() => import('./admin/users'))}
                    />*/}
                    <Route
                        path='/projects/'
                        component={lazy(() => import('./admin/projects'))}
                    />
                    <Route
                        path='/projects/:id/'
                        component={lazy(() => import('./admin/project'))}
                    />
                    <Route
                        path='/*'
                        component={() => <Navigate href='/admin/' />}
                    />
                </Route>
            </Routes>
        </Router>
    ),
    document.getElementById('root')
)
