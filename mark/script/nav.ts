// mobile
function onMobile() {
    setMarginTop()

    const mobileMenuOpen = document.querySelector(
        'button.mobile-open'
    ) as HTMLElement
    const mobileMenuClose = document.querySelector(
        'button.mobile-close'
    ) as HTMLElement

    mobileMenuOpen.addEventListener('click', () => {
        document.querySelector('main').className += ' mobile-active'
        document.querySelector('nav.nav-container').className +=
            ' mobile-active'
    })

    mobileMenuClose.addEventListener('click', () => {
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

    const container = document.querySelector('.pc-container') as HTMLElement
    const links = document.querySelectorAll('a.nav-link')
    const line = document.querySelector('div.line') as HTMLElement

    links.forEach((link: HTMLElement) => {
        link.addEventListener('mouseover', e => {
            const linkRight = link.getBoundingClientRect().x
            const linkWidth = link.getBoundingClientRect().width

            const lineWidth = link.getBoundingClientRect().width

            line.style.right = `${innerWidth - linkRight - linkWidth - 25}px`
            line.style.width = `${lineWidth - 40}px`
        })
    })
    container.addEventListener('mouseleave', () => {
        line.style.width = `0px`
    })
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
