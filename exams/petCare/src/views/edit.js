import { html } from "../../node_modules/lit-html/lit-html.js";
import { editPet, getPetById } from "../api/data.js";

let editTemplate = (pet, onSubmit) => html `
<section id="editPage">
            <form @submit=${onSubmit} class="editForm">
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value=${pet.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value=${pet.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value=${pet.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value=${pet.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value=${pet.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`

export async function editPage(ctx) {
    const pet = await getPetById(ctx.params.id)
    ctx.render(editTemplate(pet, onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        const pet = {
            name: formData.get('name').trim(),
            breed: formData.get('breed').trim(),
            age: formData.get('age').trim(),
            weight: formData.get('weight').trim(),
            image: formData.get('image').trim(),
        }

        if(pet.name == '' || pet.breed == '' || pet.age == '' || pet.weight == '' || pet.image == ''){
            return alert('All fields are required!')
        }

        await editPet(ctx.params.id, pet)
        e.target.reset()
        ctx.page.redirect('/details')
    }
}