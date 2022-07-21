import * as api from "./api.js";

const endPoints = {
    recipes: '/data/recipes',
    recipeById: '/data/recipes'
}

export async function getAllRecipes() {
    return api.get(endPoints.recipes)
}

export async function getById(id) {
    return api.get(endPoints.recipeById + id)
}