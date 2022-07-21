//import { createHashRouter } from "./hashRouter.js"
import { createHistoryRouter } from "./historyRouter.js"
const views = {
    '/': () => '<h2>Home Page</h2><p>Welcome to our site</p>',
    '/home': () => '<h2>Home Page</h2><p>Welcome to our site</p>',
    '/catalog': () => '<h2>Catalog Page</h2><ul><li>Product 1</li></ul>',
    '/about': () => '<h2>About Page</h2><p>Contact: </p>'
}
const main = document.querySelector('main')

const getName = createHistoryRouter(main, views, start)
//const getName = createHashRouter(main, views, start)

start(getName())

function start(name) {
    const view = views[name]

    if (typeof view == 'function') {
        main.innerHTML = view()
        return true
    }
    return false
}
