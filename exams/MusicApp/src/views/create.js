import { html } from "../../node_modules/lit-html/lit-html.js"
import { createArticle } from "../api/data.js"

let createTemplate = (onSubmit) => html`
<section class="createPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Add Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" placeholder="Album name">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" placeholder="Price">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" placeholder="Description"></textarea>

                <button class="add-album" type="submit">Add New Album</button>
            </div>
        </fieldset>
    </form>
</section>

`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

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

        await createArticle(article)
        ctx.page.redirect('/catalogue')
    }
}