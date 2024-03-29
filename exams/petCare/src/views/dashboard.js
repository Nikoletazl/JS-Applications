import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPets } from "../api/data.js";

let dashboardTemplate = (pets) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${pets.length == 0 ? html`<p class="no-pets">No pets in dashboard</p>`
            : html` <div class="animals-dashboard">${pets.map((pet) => html`
            <div class="animals-board">
                <article class="service-img">
                    <img class="animal-image-cover" src=${pet.image}>
                </article>
                <h2 class="name">${pet.name}</h2>
                <h3 class="breed">${pet.breed}</h3>
                <div class="action">
                    <a class="btn" href="/details/${pet._id}">Details</a>
                </div>
            </div>
            `)}</div>`}
    </div>
</section>
`

export async function dashboardPage(ctx) {
    let pets = await getAllPets()
    ctx.render(dashboardTemplate(pets))
}