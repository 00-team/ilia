// mobile
const mobileMenuOpen = document.querySelector(
    'button.mobile-open'
) as HTMLElement
const mobileMenuClose = document.querySelector(
    'button.mobile-close'
) as HTMLElement

console.log(mobileMenuClose)

mobileMenuOpen.addEventListener('click', () => {
    console.log(document.querySelector('main'))
    document.querySelector('main').className += ' mobile-active'
    document.querySelector('nav.nav-container').className += ' mobile-active'
})

mobileMenuClose.addEventListener('click', () => {
    console.log('slm')
    let mainClass = document
        .querySelector('main')
        .className.replace('mobile-active', '')

    let mobileClass = document
        .querySelector('nav.nav-container')
        .className.replace('mobile-active', '')

    document.querySelector('main').className = mainClass
    document.querySelector('nav.nav-container').className = mobileClass
})

const navLinks = document.querySelectorAll('a.nav-link')

navLinks.forEach((link: HTMLElement, index) => {
    return (link.style.transitionDelay = `${index * 100}ms`)
})

// mobile end
