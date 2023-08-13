import React, { FC, useEffect } from 'react'

import { ContactForm } from 'components'

import { AboutCreator } from './AboutCreator'
import { AboutHeader } from './AboutHeader'
import AboutHonors from './AboutHonors'
import { AboutProjects } from './AboutProjects'

import './style/about.scss'

const About: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className='about-page-container'>
            <AboutHeader />
            <AboutCreator />
            <AboutProjects />
            <AboutHonors />
            <ContactForm />
        </main>
    )
}

export default About
