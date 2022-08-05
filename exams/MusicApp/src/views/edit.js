import { html } from "../../node_modules/lit-html/lit-html.js"
import { editArticle, getArticleById } from "../api/data.js"

let editTemplate = (article, onSubmit) => html`
<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value=${article.name}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${article.imgUrl}>

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value=${article.price}>

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${article.releaseDate}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value=${article.artist}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value=${article.genre}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${article.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`

export async function editPage(ctx){
    let article = await getArticleById(ctx.params.id)
    ctx.render(editTemplate(article, onSubmit))

    async function onSubmit(e){
        e.preventDefault()

        let formData = new FormData(e.target)

        const article = {
            name: formData.get('name').trim(),
            imgUrl: formData.get('imgUrl').trim(),
            price: formData.get('price').trim(),
            releaseDate: formData.get('releaseDate').trim(),
            artist: formData.get('artist').trim(),
            genre: formData.get('genre').trim(),
            description: formData.get('description').trim()
          
        }

        if( article.name == '' || article.imgUrl == '' || article.price == '' || article.releaseDate == '' || article.artist == '' || article.genre == '' || article.description == ''){
            return alert('All fields are required!')
        }

        await editArticle(ctx.params.id, article)
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}