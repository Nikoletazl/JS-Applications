import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./util.js";
import page from "../node_modules/page/page.mjs"
import { loginPage } from "./views/login.js";
import { homePage } from "./views/home.js";
import { regsterPage } from "./views/register.js";
import { logout } from "./api/api.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPost } from "./api/data.js";
import { editPage } from "./views/edit.js";
import { myPostsPage } from "./views/myPosts.js";

let root = document.getElementById('main-content')

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav
    next()
}

export function updateUserNav() {
    let userData = getUserData()
    if (userData) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    }else {
        document.getElementById('guest').style.display = 'inline-block'
        document.getElementById('user').style.display = 'none'
    }
}

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logout()
    updateUserNav()
    page.redirect('/')
})

page(decorateContext)
page('/', homePage)
page('/login', loginPage)
page('/register', regsterPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage) 
page('/myposts', myPostsPage) 
updateUserNav()
page.start()