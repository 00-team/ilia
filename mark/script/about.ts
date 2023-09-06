const serviceCards = document.querySelectorAll('.service-card')
const serviceCardsWrapper = document.querySelector(
    '.services-wrapper'
) as HTMLElement

const salesCards = document.querySelectorAll('.sales-card')
const salesCardsWrapper = document.querySelector(
    '.sales-wrapper'
) as HTMLElement

if (innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', () => {
        let observer = new IntersectionObserver(
            ([entry]) => {
                if (entry && entry.isIntersecting) {
                    entry.target.className += ' active'
                    observer.unobserve(entry.target)
                }
            },
            {
                threshold: 0.7,
            }
        )

        serviceCards.forEach(card => observer.observe(card))
        salesCards.forEach(card => observer.observe(card))
    })
} else {
    document.addEventListener('DOMContentLoaded', () => {
        let observer = new IntersectionObserver(
            ([entry]) => {
                if (entry && entry.isIntersecting) {
                    entry.target.className += ' active'
                    observer.unobserve(entry.target)
                }
            },
            {
                rootMargin: '-250px',
            }
        )

        observer.observe(serviceCardsWrapper)
        observer.observe(salesCardsWrapper)
    })
}
