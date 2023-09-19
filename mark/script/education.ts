const emu = document.querySelector('section.emu')
const emuImg = document.querySelector('.emu-img') as HTMLElement
const honors = document.querySelectorAll('.honors')
const extra = document.querySelector('.extra')
const ciu = document.querySelector('section.ciu')
const nearEast = document.querySelector('section.near-east')
const services = document.querySelector('section.services')

document.addEventListener('DOMContentLoaded', () => {
    const options =
        innerWidth <= 768
            ? {
                  threshHold: 0.5,
              }
            : {
                  rootMargin: '-250px',
              }
    let observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            entry.target.className += ' active'
            observer.unobserve(entry.target)
        }
    }, options)

    observer.observe(emu)
    observer.observe(emuImg)
    observer.observe(extra)
    observer.observe(ciu)
    observer.observe(nearEast)
    observer.observe(services)

    honors.forEach(honor => observer.observe(honor))
})
