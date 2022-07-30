import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllPosts } from "../api/data.js"
import { postPreview } from "./common.js"

let homeTemplate = (posts) => html `
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${posts.length == 0 ? html `<h1 class="title no-posts-title">No posts yet!</h1>`
    : html `<div class="all-posts">${posts.map(postPreview)}</div>`
    }
</section>
`

export async function homePage(ctx) {
    let posts = await getAllPosts()
    ctx.render(homeTemplate(posts))
}