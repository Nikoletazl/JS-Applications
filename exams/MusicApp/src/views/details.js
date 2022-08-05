import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteArticle, getArticleById } from "../api/data.js"
import { getUserData } from "../util.js"

let detailsTemplate = (article, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${article.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${article.name}</h1>
                <h3>Artist: ${article.artist}</h3>
                <h4>Genre: ${article.genre}</h4>
                <h4>Price: $${article.price}</h4>
                <h4>Date: ${article.releaseDate}</h4>
                <p>Description: ${article.description}</p>
            </div>
            ${articleBtns(article, isOwner, onDelete)}
        </div>
    </div>
</section>
`

let articleBtns = (article, isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <div class="actionBtn">
            <a href="/edit/${article._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>
        `
    }else {
        return null
    }
}

export async function detailsPage(ctx){
    let userData = getUserData()
    let article = await getArticleById(ctx.params.id)

    let isOwner = userData && userData.id == article._ownerId
    ctx.render(detailsTemplate(article, isOwner, onDelete))

    async function onDelete(){
        await deleteArticle(ctx.params.id)
        ctx.page.redirect('/catalogue')
    }
}