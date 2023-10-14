const emu = document.querySelector('section.emu')
const emuImg = document.querySelector('.emu-img') as HTMLElement
const honors = document.querySelectorAll('.honors')
const extra = document.querySelector('.extra')
const ciu = document.querySelector('section.ciu')
const nearEast = document.querySelector('section.near-east')
const services = document.querySelector('section.services')

const observerOptions =
    innerWidth <= 768
        ? {
              threshHold: 0.5,
          }
        : {
              rootMargin: '-250px',
          }

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            entry.target.className += ' active'
            observer.unobserve(entry.target)
        }
    }, observerOptions)

    observer.observe(emu)
    observer.observe(emuImg)
    observer.observe(extra)
    observer.observe(ciu)
    observer.observe(nearEast)
    observer.observe(services)

    honors.forEach(honor => observer.observe(honor))
})

// near-east

const eastExtra = document.querySelector('div.extra#east')
const typer = document.querySelector('span.type-title') as HTMLElement

const title =
    'دانشگاه خاور نزدیک در بسیاری از موارد جزو اولین های قبرس میباشد از جمله:'

function typeTitle() {
    title.split('')
    let part = ''
    let currentLetter = 0
    const interval = setInterval(() => {
        if (!title[currentLetter]) {
            clearInterval(interval)
        } else {
            part += title[currentLetter++]
            typer.innerHTML = part
        }
    }, 50)
}

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            typeTitle()

            observer.unobserve(entry.target)
        }
    }, observerOptions)

    observer.observe(eastExtra)
})
