export function createHashRouter(main, views, start) {
    window.addEventListener('hashchange', () => start(onChange()))
    return onChange
    
    function onChange() {
        return window.location.hash
    }
}