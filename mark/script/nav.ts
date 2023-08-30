// mobile
function onMobile() {
    setMarginTop()

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
        document.querySelector('nav.nav-container').className +=
            ' mobile-active'
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

    const navLinks = document.querySelectorAll('.nav-link')

    navLinks.forEach((link: HTMLElement, index) => {
        return (link.style.transitionDelay = `${index * 100}ms`)
    })
}
// mobile end

// pc
function onPc() {
    setMarginTop()
}
// pc end

// global
function setMarginTop() {
    const navHeight = document
        .querySelector('nav.nav-container')
        .getBoundingClientRect().height
    const main = document.querySelector('main') as HTMLElement
    main.style.marginTop = `${navHeight}px`
}

innerWidth <= 768 ? onMobile() : onPc()
window.onresize = () => {
    innerWidth <= 768 ? onMobile() : onPc()
}
// global end
