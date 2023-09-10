const articles = document.querySelectorAll('article')

const typer1 = document.querySelector('span.type-title') as HTMLElement
const typer2 = document.querySelector('span.type-title2') as HTMLElement

const title1 = 'سرمايه گذاري و رشد پول'
const title2 =
    'قبرس شمالي با توجه به نكات پايين سرمايه گذاران زيادي را به خود جذب مي كند.'

function typeTitle1() {
    title1.split('')
    let part = ''
    let currentLetter = 0
    const interval = setInterval(() => {
        if (!title1[currentLetter]) {
            typeTitle2()
            clearInterval(interval)
        } else {
            part += title1[currentLetter++]
            typer1.innerHTML = part
        }
    }, 75)
}

function typeTitle2() {
    title2.split('')
    let part = ''
    let currentLetter = 0
    const interval = setInterval(() => {
        if (!title2[currentLetter]) {
            clearInterval(interval)
        } else {
            part += title2[currentLetter++]
            typer2.innerHTML = part
        }
    }, 50)
}

typeTitle1()

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

    articles.forEach(section => observer.observe(section))
})

const security = document.querySelector('section.security') as HTMLElement
const thiefImgs = document.querySelectorAll('img.security')

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                entry.target.className += ' active'
            } else {
                const currrentClass = security.className.replace('active', '')

                entry.target.className = currrentClass
            }
        },
        {
            rootMargin: innerWidth <= 768 ? '-100px' : '-200px',
        }
    )

    observer.observe(security)
})

const improvementsUpper = document.querySelector(
    '.improvments-upper'
) as HTMLElement

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                console.log(entry.intersectionRatio)
            }
        },
        {
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
    )

    observer.observe(improvementsUpper)
})
