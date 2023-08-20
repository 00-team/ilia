divimport React, { FC, useEffect } from 'react'

// import { renderToString } from 'react-dom/server'
import { Footer, Navbar } from 'layout'
import { FC, useEffect } from 'react'
import {
    Route,
    /* Route */
    Routes,
} from 'react-router-dom'

import './style/base.scss'
import './style/font/imports.scss'

const App: FC = () => {
    useEffect(() => {
        window.history.scrollRestoration = 'manual'
    }, [])

    return (
        <>
            <Navbar />
            <MainContent />
            <Footer />
        </>
    )
}

const MainContent: FC = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    )
}

const Home: FC = () => {
    return <div> home </div>
}

export default App
