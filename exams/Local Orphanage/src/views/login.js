import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/api.js"

let loginTemplate = (onSubmit) => html `
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>
`

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        let formData = new FormData(e.target)

        let email = formData.get('email').trim()
        let password = formData.get('password').trim()

        if (email == '' || password == '') {
            return alert('Please, fill all fields!')
        }

        await login(email, password)
        ctx.updateUserNav()
        ctx.page.redirect('/')
    }
}