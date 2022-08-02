import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePet, donatePet, getDonationsByPetId, getMyDonationsByPetId, getPetById } from "../api/data.js";
import { getUserData } from "../util.js";

let detailsTemplate = (pet, isOwner, onDelete, donations, showDonateBtn, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age} years</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donations * 100}$</h4>
            </div>
            <div class="actionBtn">
                ${petControlsTemplate(pet, isOwner, onDelete)}
                ${donationsControlsTemplate(showDonateBtn, onDonate)}
            </div>

</section>
`

let petControlsTemplate = (pet, isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <a href="/edit/${pet._id}" class="edit">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        `
    }else {
        return null
    }
}

let donationsControlsTemplate = (showDonateBtn, onDonate) => {
    if(showDonateBtn) {
        return html `
        <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>
        `
    }else {
        return null
    }
}

export async function detailsPage(ctx) {
    let userData = getUserData()

    let [pet, donations, hasDonate] = await Promise.all([
        getPetById(ctx.params.id),
        getDonationsByPetId(ctx.params.id),
        userData ? getMyDonationsByPetId(ctx.params.id, userData.id) : 0
    ])

    let isOwner = userData && userData.id == pet._ownerId
    let showDonateBtn = isOwner == false && hasDonate == false && userData != null 
    ctx.render(detailsTemplate(pet, isOwner, onDelete, donations, showDonateBtn, onDonate))

    async function onDelete(){
        await deletePet(ctx.params.id)
        ctx.page.redirect('/')
    }

    async function onDonate() {
        await donatePet(ctx.params.id)
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}