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
    document.querySelector('.mobile-container').className += ' active'
})

mobileMenuClose.addEventListener('click', () => {
    console.log('slm')
    let mainClass = document
        .querySelector('main')
        .className.replace('mobile-active', '')

    let mobileClass = document
        .querySelector('.mobile-container')
        .className.replace('active', '')

    document.querySelector('main').className = mainClass
    document.querySelector('.mobile-container').className = mobileClass
})

// mobile end
