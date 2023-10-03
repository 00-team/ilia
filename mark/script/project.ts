const ticks = document.querySelectorAll('.tick')

ticks.forEach((tick: HTMLElement, index) => {
    tick.style.animationDelay = `${0.2 * (index / 2)}s`
    console.log(tick)
})
