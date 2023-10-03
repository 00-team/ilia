const ticks = document.querySelectorAll('.tick')

ticks.forEach((tick: HTMLElement, index) => {
    tick.style.animationDelay = `${0.2 * (index / 2)}s`
    console.log(tick)
})

const mainImg = document.querySelector('.main-img') as HTMLImageElement
const imgs = document.querySelectorAll('.other-img')

imgs.forEach((img: HTMLImageElement, index) => {
    img.addEventListener('click', e => {
        mainImg.src = img.src
    })
})
