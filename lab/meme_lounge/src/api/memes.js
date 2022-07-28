import { getUserData } from "../util.js";
import { del, get, post, put } from "./api.js";

export function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc')
}

export function createMeme(meme) {
    return post('/data/memes', meme)
}

export function getMemeId(id) {
    return get('/data/memes/' + id)
}

export function deleteMeme(id) {
    return del('/data/memes/' + id)
}

export function updateMeme(id, meme) {
    return put('/data/memes/' + id, meme)
}

export function getMemesByUser(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
