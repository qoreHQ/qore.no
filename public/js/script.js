/**
 * Set copyleft info to current year
 */
document.getElementById('copyright-year').outerHTML = new Date().getYear() + 1900

/*
 * Handle color scheme selection
 */
let isDarkMode = false
setColorScheme()

/**
 * Preload toggle svg to avoid flicker on hover
 */
preloadImage('img/light.svg')
preloadImage('img/dark.svg')

const toggle = document.getElementById('appearance-toggle')
toggle.addEventListener('click', () => activateDarkMode(!isDarkMode), false)

/**
 * Set favicon based on browser color scheme
 */
const DARK = '(prefers-color-scheme: dark)'
const mqDark = window.matchMedia(DARK)
const favicons = document.querySelectorAll('link[rel="icon"]')
favicons.forEach((link) => {
    link.href = mqDark ? link.dataset.hrefDark : link.dataset.hrefLight
})

/**
 * Updates the body class name to reflect the current theme
 */
function activateDarkMode(dark) {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add(dark ? 'dark-mode' : 'light-mode')
    body.classList.remove(dark ? 'light-mode' : 'dark-mode')
    isDarkMode = dark
}

/**
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
function setColorScheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
    const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addListener((e) => e.matches && activateDarkMode(true))
    window
        .matchMedia('(prefers-color-scheme: light)')
        .addListener((e) => e.matches && activateDarkMode(false))

    if (isDarkMode) activateDarkMode(true)
    if (isLightMode) activateDarkMode(false)
    if (isNotSpecified || hasNoSupport) {
        now = new Date()
        hour = now.getHours()
        if (hour < 5 || hour >= 18) {
            activateDarkMode(true)
        }
    }
}

/**
 * Preloads images to avoid load times
 */
function preloadImage(url) {
    var img = new Image()
    img.src = url
}
