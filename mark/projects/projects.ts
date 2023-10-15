const headerTyper = document.querySelector('span.header-typer') as HTMLElement
const headerTyperWrapper = document.querySelector(
    '.typer-wrapper'
) as HTMLElement

const headerLabel = document.querySelector(
    'label.input-wrapper'
) as HTMLLabelElement

const search_input = document.querySelector<HTMLInputElement>(
    'input#search_project_inp'
)

headerLabel.addEventListener('click', () => {
    headerTyperWrapper.style.display = 'none'
})
if (search_input.value) headerTyperWrapper.style.display = 'none'

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
if (!search_input.value) headerType()

document.getElementById('search_btn').onclick = function () {
    if (!search_input.value) {
        location.search = ''
        return
    }

    location.search = '?q=' + search_input.value
}
