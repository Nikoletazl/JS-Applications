import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllArticles } from "../api/data.js"
import { getUserData } from "../util.js"

let catalogueTemplate = (articles) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${articles.length == 0 ? html `<p>No Albums in Catalog!</p>`
        : articles.map(article => html`
    <div class="card-box">
        <img src=${article.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${article.name}</p>
                <p class="artist">Artist: ${article.artist}</p>
                <p class="genre">Genre: ${article.genre}</p>
                <p class="price">Price: $${article.price}</p>
                <p class="date">Release Date: ${article.releaseDate}</p>
            </div>
            ${detailsBtn(article)}
        </div>
    </div>
    `)}
</section>
`
let detailsBtn = (article) => {
    let userData = getUserData()
    if(userData) {
        return html `<div class="btn-group">
        <a href="/details/${article._id}" id="details">Details</a>
    </div>`
    } else {
        return null
    }
}

export async function cataloguePage(ctx){
    let articles = await getAllArticles()
    ctx.render(catalogueTemplate(articles))
}