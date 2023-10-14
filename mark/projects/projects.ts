const headerTyper = document.querySelector('span.header-typer') as HTMLElement
const headerTyperWrapper = document.querySelector(
    '.typer-wrapper'
) as HTMLElement

const headerLabel = document.querySelector(
    'label.input-wrapper'
) as HTMLLabelElement

headerLabel.addEventListener('click', () => {
    headerTyperWrapper.style.display = 'none'
})

const typerText = 'جستجو کنید ...'

function headerType() {
    typerText.split('')
    let part = ''
    let currentLetter = 0
    const interval = setInterval(() => {
        if (!typerText[currentLetter]) {
            clearInterval(interval)
        } else {
            part += typerText[currentLetter++]
            headerTyper.innerHTML = part
        }
    }, 150)
}

headerType()
