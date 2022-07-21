import {html} from '../../node_modules/lit-html/lit-html.js'
import { getAllRecipes } from '../data/recipes.js'
import {repeat} from '../../node_modules/lit-html/directives/repeat.js'

const catalogTemplate = (recipes) => html `
<h2>Catalog Page</h2>
<ul>
    ${repeat(recipes, r => r._id, recipeCard)}

</ul>
`

const recipeCard = (recipe) => html `<li><a href="/catalog/${recipe._id}">${recipe.name}</a></li>`

export async function showCatalog(ctx) {
    ctx.render(catalogTemplate([]))
    const recipes = await getAllRecipes()
    ctx.render(catalogTemplate(recipes))
}