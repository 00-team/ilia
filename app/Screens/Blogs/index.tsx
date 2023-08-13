import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import './style/blogs.scss'

const headerImg = '/static/image/header.webp'

const Blogs: FC = () => {
    return (
        <main className='blogs-container'>
            <header
                className='products-header'
                style={{
                    backgroundImage: `
linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
url(${headerImg})`,
                }}
            >
                <h2 className='header-title title_hero'>مقالات</h2>
            </header>
            <section className='blogs-wrapper'>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </section>
        </main>
    )
}

const BlogCard: FC = () => {
    return (
        <figure className='blog-card'>
            <img
                decoding={'async'}
                loading={'lazy'}
                className='card-img'
                src='https://picsum.photos/1920/1080'
                alt='مقاله صنایع تولیدی حیدری'
            />
            <figcaption className='card-caption title_smaller'>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید
                سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است لورم
                ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
            </figcaption>

            <Link to={'/blog/'} className='link-container title_smaller  '>
                دیدن بیشتر
            </Link>
        </figure>
    )
}

export default Blogs
