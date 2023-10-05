const attrsSection = document.querySelector(
    'section.row.attributes'
) as HTMLElement

const attrsHeaderSvgs = document.querySelectorAll('.attr-svg')
const attrsDataSvgs = document.querySelectorAll('.star-svg')

attrsHeaderSvgs.forEach((svg: HTMLElement, index) => {
    return (svg.style.animationDelay = `${index * 75}ms`)
})
attrsDataSvgs.forEach((svg: HTMLElement, index) => {
    return (svg.style.animationDelay = `${1000 + index * 100}ms`)
})

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions =
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
    }, observerOptions)

    observer.observe(attrsSection)
})
