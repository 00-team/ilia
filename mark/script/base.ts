window.onbeforeunload = function () {
    window.scrollTo(0, 0)
}
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.scrollTop = 0
})
