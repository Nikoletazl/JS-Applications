import { html } from "../../node_modules/lit-html/lit-html.js"
import { getPostById, editPost } from "../api/data.js"

let editTemplate = (post, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value=${post.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value=${post.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value=${post.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value=${post.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value=${post.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>
`

export async function editPage(ctx) {
    const post = await getPostById(ctx.params.id)
    ctx.render(editTemplate(post, onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        const post = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            address: formData.get('address'),
            phone: formData.get('phone')
        }

        if(post.title == '' || post.description == '' || post.imageUrl == '' || post.address == '' || post.phone == '' ){
            return alert('All fields are required!')
        }

        await editPost(ctx.params.id, post)
        e.target.reset()
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}