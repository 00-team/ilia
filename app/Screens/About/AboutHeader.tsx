import React, { FC } from 'react'

import './style/aboutHeader.scss'

const headerImg = '/static/image/about.webp'

export const AboutHeader: FC = () => {
    return (
        <header
            className='about-page-header'
            style={{
                backgroundImage: `
linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
url(${headerImg})`,
            }}
        >
            <h2 className='header-title title_hero'>
                درباره <span>حیدری</span>
            </h2>
        </header>
    )
}
