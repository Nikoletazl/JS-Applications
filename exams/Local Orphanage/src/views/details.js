import { html } from "../../node_modules/lit-html/lit-html.js"
import { deletePost, getPostById } from "../api/data.js"
import { getUserData } from "../util.js"

let detailsTemplate = (post, isOwner, onDelete) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${post.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>

                <!--Edit and Delete are only for creator-->
                <div class="btns">
                    ${postControlsTemplates(post, isOwner, onDelete)}
                </div>

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="#" class="donate-btn btn">Donate</a>
                </div>

            </div>
        </div>
    </div>
</section>
`

let postControlsTemplates = (post, isOwner, onDelete) => {
    if(isOwner) {
        return html `
        <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
    } else {
        return null
    }
}

export async function detailsPage(ctx) {
    let userData = getUserData()
    let post = await getPostById(ctx.params.id)
  

    let isOwner = userData && userData.id == post._ownerId
    ctx.render(detailsTemplate(post, isOwner, onDelete))

    async function onDelete() {
        await deletePost(ctx.params.id)
        ctx.page.redirect('/')
    }
}