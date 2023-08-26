window.onbeforeunload = function () {
    document.body.innerHTML = null
    window.scrollTo(0, 0)
}
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.scrollTop = 0
})
