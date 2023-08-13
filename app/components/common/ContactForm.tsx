import React, { FC } from 'react'

import { FaxSvg, PhoneSvg } from 'Icons'

import './style/contactform.scss'

export const ContactForm: FC = () => {
    return (
        <div className='contact-wrapper'>
            <aside className='contact-data title_small'>
                <div className='contact-header'>
                    <a className='link call' href='tel:02155004626'>
                        <div className='link-holder'>
                            <div className='icon'>
                                <FaxSvg size={25} />
                            </div>
                            <div className='holder'>تلفن کارخانه</div>
                        </div>
                        <div className='data'>021 - 55004626</div>
                    </a>
                    <a className='link call' href='tel:02155005158'>
                        <div className='link-holder'>
                            <div className='icon'>
                                <FaxSvg size={25} />
                            </div>
                            <div className='holder'>تلفن کارخانه</div>
                        </div>
                        <div className='data'>021 - 55005158</div>
                    </a>
                    <a className='link call' href='tel:9129429430'>
                        <div className='link-holder'>
                            <div className='icon'>
                                <PhoneSvg size={25} />
                            </div>
                            <div className='holder'>تلفن همراه</div>
                        </div>
                        <div className='data'>+98 - 9129429430</div>
                    </a>
                </div>
                <div className='contact-body'>
                    <p className='title_small'>
                        آدرس: تهران ، صالح آباد شرقی ، نبش میدان شهید خالقی پ ۲{' '}
                    </p>
                </div>
            </aside>
            <aside className='location'>
                <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.8432237114876!2d51.398114240961355!3d35.60693365010938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f91fee562d59ecd%3A0x6b19f3f9e0e18b6d!2z2LXZhtin24zYuSDYqtmI2YTbjNiv24wg2K3bjNiv2LHbjA!5e0!3m2!1sen!2s!4v1690967302774!5m2!1sen!2s'
                    allowFullScreen
                    loading={'lazy'}
                    height={500}
                ></iframe>
            </aside>
        </div>
    )
}
