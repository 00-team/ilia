export {}

const heroSection = document.querySelector(
    'section.hero-section'
) as HTMLElement

heroSection.addEventListener('mousemove', (e: MouseEvent) => {
    var moveinX = (e.clientX * -1) / 100
    var moveinY = (e.clientY * -1) / 100

    console.log(moveinX, moveinY)

    heroSection.style.backgroundPosition = `${moveinX}px ${moveinY}px`
})
