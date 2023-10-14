export {}

// hero section
const heroSection = document.querySelector(
    'section.hero-section'
) as HTMLElement
const stickyButton = document.querySelector('a.hero-btn.main') as HTMLElement

stickyButton.addEventListener('mousemove', e => {
    stickyButton.className += ' active'

    const pos = stickyButton.getBoundingClientRect()
    const mx = e.clientX - pos.left - pos.width / 2
    const my = e.clientY - pos.top - pos.height / 2

    stickyButton.style.transform = `
        translate(${mx * 0.15}px ,${my * 0.3}px)
        rotate3d(${mx * -0.1}, ${my * -0.3}, 0, 12deg)
    `
})
stickyButton.addEventListener('mouseleave', e => {
    stickyButton.className = 'hero-btn main'
    stickyButton.style.transform = ''
})

const isMobile = () => {
    const regex =
        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return regex.test(navigator.userAgent)
}

!isMobile() &&
    heroSection.addEventListener('mousemove', (e: MouseEvent) => {
        var moveinX = (e.clientX * -1) / 100
        var moveinY = (e.clientY * -1) / 100

        heroSection.style.backgroundPosition = `${moveinX}px ${moveinY}px`
    })

const htmlWord = document.querySelector('span.typer-word') as HTMLElement
const words = [
    'اخذ اقامت',
    ' خرید ملک ',
    ' پذیرش دانشجویی',
    'مشاوره ملک',
    ' اجاره ملک',
]
let currentMessage = 0
const DELETE_DELAY = 1000
const START_DELAY = 250

function typeMessage() {
    if (!words[currentMessage]) {
        currentMessage = 0
    }
    const currentStr = words[currentMessage]
    currentStr.split('')
    let part = ''
    let currentLetter = 0
    let int1 = setInterval(() => {
        if (!currentStr[currentLetter]) {
            currentMessage++
            setTimeout(() => {
                deleteMessage(part)
            }, DELETE_DELAY)
            clearInterval(int1)
        } else {
            part += currentStr[currentLetter++]
            htmlWord.innerHTML = part
        }
    }, 100)
}
function deleteMessage(str) {
    let int = setInterval(() => {
        if (str.length === 0) {
            setTimeout(() => {
                typeMessage()
            }, START_DELAY)
            clearInterval(int)
        } else {
            str = str.split('')
            str.pop()
            str = str.join('')
            htmlWord.innerHTML = str
        }
    }, 50)
}
typeMessage()

// hero section end

// about us

const aboutWrapper = document.querySelector('section.about-us') as HTMLElement
const aboutColumns = document.querySelectorAll(
    'div.about-column'
) as NodeListOf<HTMLElement>

// about us end

// why cyprus

const cyprusWrapper = document.querySelector(
    'section.why-cyprus'
) as HTMLElement

// why cyprus end

// education

const educationCards = document.querySelectorAll('.education-card')

let activieEducation = 1
const CHANGE_EDU_CARD = 5000

const getEducationCardClass = (index: number) => {
    if (activieEducation === index) return 'active'
    if (activieEducation - 1 === index) return 'next'
    if (activieEducation + 1 === index) return 'prev'
    if (activieEducation === educationCards.length - 1 && index === 0)
        return 'prev'
    return ''
}

const setEducationCardClass = () => {
    educationCards.forEach((card, index) => {
        card.className = `education-card ${getEducationCardClass(index)}`
    })
}

setEducationCardClass()
setInterval(() => {
    if (activieEducation + 2 > educationCards.length) {
        activieEducation = 1
    } else {
        activieEducation += 1
    }

    return setEducationCardClass()
}, CHANGE_EDU_CARD)

// education end

// contact
const contactWrapper = document.querySelector('section.contact') as HTMLElement
// contact end

// blogs
const blogs = document.querySelector('section.blogs')
// blogs end

// global

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                entry.target.className += ' active'
                observer.unobserve(entry.target)
            }
        },
        {
            rootMargin: '-175px',
        }
    )

    observer.observe(aboutWrapper)
    aboutColumns.forEach(column => observer.observe(column))
    observer.observe(contactWrapper)
    observer.observe(cyprusWrapper)
    observer.observe(blogs)
})

// global end
