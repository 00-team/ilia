const emu = document.querySelector('section.emu')
const emuImg = document.querySelector('.emu-img') as HTMLElement
const honors = document.querySelectorAll('.honors')
const extra = document.querySelector('.extra')

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
    observer.observe(extra)
})

document.addEventListener('DOMContentLoaded', () => {
    let observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                entry.target.className += ' active'
                startConfetti()
                observer.unobserve(entry.target)
            }
        },
        {
            rootMargin: '-250px',
        }
    )

    honors.forEach(honor => observer.observe(honor))
})

function startConfetti() {
    const duration = 1000 // 4 seconds in milliseconds
    const end = Date.now() + duration

    function frame() {
        // Calculate the time remaining
        const timeLeft = end - Date.now()

        // If the time is up, stop the animation
        if (timeLeft <= 0) {
            return
        }

        // Create confetti at random positions on the screen
        //   @ts-ignore
        confetti({
            particleCount: 100,
            spread: 150,
            colors: ['#ffffff', '#FFD700'], // Set the color to white for a snow-like effect
            origin: { x: 0.5, y: 0 }, // Start from the top-left corner
            angle: 90, // Angle to make it fall vertically
            velocity: 150, // Adjust the velocity to control the falling speed
            gravity: innerWidth <= 768 ? 1.5 : 3,
        })

        // Request the next frame
        requestAnimationFrame(frame)
    }

    // Start the animation
    frame()
}
