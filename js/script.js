document.getElementById('copyright-year').outerHTML = new Date().getYear() + 1900

let isDarkMode = false

const toggle = document.getElementById('appearance-toggle')
toggle.addEventListener('click', toggleAppearance, false)

function toggleAppearance() {
    isDarkMode ? activateLightMode() : activateDarkMode()
}

function activateDarkMode() {
    document.getElementsByTagName('body')[0].classList.add('dark-mode')
    document.getElementsByTagName('body')[0].classList.remove('light-mode')
    isDarkMode = true
}

function activateLightMode() {
    document.getElementsByTagName('body')[0].classList.add('light-mode')
    document.getElementsByTagName('body')[0].classList.remove('dark-mode')
    isDarkMode = false
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
        .addListener((e) => e.matches && activateDarkMode())
    window
        .matchMedia('(prefers-color-scheme: light)')
        .addListener((e) => e.matches && activateLightMode())

    if (isDarkMode) activateDarkMode()
    if (isLightMode) activateLightMode()
    if (isNotSpecified || hasNoSupport) {
        now = new Date()
        hour = now.getHours()
        if (hour < 4 || hour >= 16) {
            activateDarkMode()
        }
    }
}

setColorScheme()
