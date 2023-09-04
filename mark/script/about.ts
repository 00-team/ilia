import { C } from '@00-team/utils'

const cards = document.querySelectorAll('.service-card')
const cardWrapper = document.querySelector('.services-wrapper')

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                console.log(entry)
                entry.target.className += ' active'
                observer.unobserve(entry.target)
            }
        },
        {
            threshold: 0.5,
        }
    )

    innerWidth <= 768
        ? cards.forEach(card => observer.observe(card))
        : observer.observe(cardWrapper)
})
