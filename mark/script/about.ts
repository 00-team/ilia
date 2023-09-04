const serviceCards = document.querySelectorAll('.service-card')
const serviceCardsWrapper = document.querySelector(
    '.services-wrapper'
) as HTMLElement

const salesCards = document.querySelectorAll('.sales-card')
const salesCardsWrapper = document.querySelector(
    '.sales-wrapper'
) as HTMLElement

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

    if (innerWidth <= 768) {
        serviceCards.forEach(card => observer.observe(card))
        salesCards.forEach(card => observer.observe(card))
    } else {
        console.log(serviceCardsWrapper)
        console.log(salesCardsWrapper)
        observer.observe(serviceCardsWrapper)
        observer.observe(salesCardsWrapper)
    }
})
