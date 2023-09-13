const emu = document.querySelector('section.emu')

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                entry.target.className += ' active'
                observer.unobserve(entry.target)
            }
        },
        {
            rootMargin: '-150px',
        }
    )

    observer.observe(emu)
})
