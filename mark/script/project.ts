const attrsSection = document.querySelector(
    'section.row.attributes'
) as HTMLElement
const payoptionsSection = document.querySelector(
    'section.row.pay-options'
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

// Set the target number you want to count up to
const targetNumber = 85 // Change this to your desired number
const step = 1

const countElement = document.querySelector('.percent-number') as HTMLElement
let currentNumber = 0

const percentSign = document.querySelector('.percent-sign')

function updateCount() {
    if (currentNumber < targetNumber) {
        currentNumber += step
        if (currentNumber > targetNumber) {
            currentNumber = targetNumber
        }
        countElement.innerHTML = currentNumber.toString()
    } else {
        clearInterval(percentInterval)
        percentSign.className += ' active'
        return
    }
}

let percentInterval = null

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions =
        innerWidth <= 768
            ? {
                  threshHold: 0.8,
              }
            : {
                  rootMargin: '-400px',
              }

    let observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            entry.target.className += ' active'
            setTimeout(() => {
                percentInterval = setInterval(updateCount, 50)
            }, 1000)

            observer.unobserve(entry.target)
        }
    }, observerOptions)

    observer.observe(payoptionsSection)
})
