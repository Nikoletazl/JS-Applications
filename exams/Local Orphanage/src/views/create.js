import { html } from "../../node_modules/lit-html/lit-html.js"
import { createPost } from "../api/data.js"

let createTemplate = (onSubmit) => html `
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <h1 class="title">Create Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone">
        </article>

        <input type="submit" class="btn submit" value="Create Post">
    </form>
</section>
`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        let formData = new FormData(e.target)
        let title = formData.get('title').trim()
        let description = formData.get('description').trim()
        let imageUrl = formData.get('imageUrl').trim()
        let address = formData.get('address').trim()
        let phone = formData.get('phone').trim()

        if(title == '' || description == '' || imageUrl == '' || address == '' || phone == ''){
            return alert('Please, fill all fields!')
        }

        await createPost({
            title,
            description,
            imageUrl,
            address,
            phone
        })

        ctx.page.redirect('/')
    }
}