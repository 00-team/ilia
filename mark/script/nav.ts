// mobile
const mobileMenu = document.querySelector('button.mobile-open') as HTMLElement

mobileMenu.addEventListener('click', () => {
    console.log(document.querySelector('main'))
    document.querySelector('main').className += ' mobile-active'
})
// mobile end
