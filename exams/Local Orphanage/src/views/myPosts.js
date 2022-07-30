import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyPosts } from "../api/data.js"
import { getUserData } from "../util.js"
import { postPreview } from "./common.js"

let myPostsTemplate = (posts) => html `
<section id="my-posts-page">
    <h1 class="title">My Posts</h1> 
    ${posts.length == 0 ? html `<h1 class="title no-posts-title">You have no posts yet!</h1>`
    : html `<div class="my-posts">
        ${posts.map(postPreview)}
        </div>`}
`

export async function myPostsPage(ctx) {
    let userData = getUserData()
    let posts = await getMyPosts(userData.id)
    ctx.render(myPostsTemplate(posts))
}