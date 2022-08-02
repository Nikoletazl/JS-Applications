import { render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/api.js"
import { getUserData } from "./util.js"
import page from "../node_modules/page/page.mjs"
import { loginPage } from "./views/login.js"
import { registerPage } from "./views/register.js"
import { homePage } from "./views/home.js"
import { dashboardPage } from "./views/dashboard.js"
import { createPage } from "./views/create.js"
import { detailsPage } from "./views/details.js"
import { editPage } from "./views/edit.js"

let root = document.getElementById('content')

function decorateContect(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav
    next()
}

export function updateUserNav(){
    let userData = getUserData()
    if(userData) {
        document.getElementById('login').style.display = 'none'
        document.getElementById('register').style.display = 'none'
        document.getElementById('create').style.display = 'inline-block'
        document.getElementById('logout').style.display = 'inline-block'
    }else {
        document.getElementById('login').style.display = 'inline-block'
        document.getElementById('register').style.display = 'inline-block'
        document.getElementById('create').style.display = 'none'
        document.getElementById('logout').style.display = 'none'
    }
}

document.getElementById('logout').addEventListener('click', (e) => {
   logout()
   updateUserNav()
   page.redirect('/')
})

page(decorateContect)
page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/dashboard', dashboardPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
updateUserNav()
page.start()