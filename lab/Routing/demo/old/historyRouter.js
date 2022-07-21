export function createHistoryRouter(main, views, start) {
    window.addEventListener('popstate', () => start(onChange()))
    document.body.addEventListener('click', event => {
        if (event.target.tagName == 'A') {
            window.history.pushState(null, '', event.target.href) 
            if(start(onChange())) {
                event.preventDefault()
            }
        }
    })

    return onChange

    function onChange() {
        return window.location.pathname
    }
}