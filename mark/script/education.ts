const emu = document.querySelector('section.emu')
const emuImg = document.querySelector('.emu-img') as HTMLElement

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

    observer.observe(emu)
    observer.observe(emuImg)
})
