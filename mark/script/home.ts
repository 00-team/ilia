export {}

const heroSection = document.querySelector(
    'section.hero-section'
) as HTMLElement

const isMobile = () => {
    const regex =
        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return regex.test(navigator.userAgent)
}

!isMobile() &&
    heroSection.addEventListener('mousemove', (e: MouseEvent) => {
        var moveinX = (e.clientX * -1) / 100
        var moveinY = (e.clientY * -1) / 100

        console.log(moveinX, moveinY)

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
