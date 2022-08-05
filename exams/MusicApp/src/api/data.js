import * as api from "./api.js"

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getAllArticles(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

export async function getArticleById(id){
    return api.get('/data/albums/' + id)
}

export async function createArticle(article){
    return api.post('/data/albums', article)
}

export async function editArticle(id, article){
    return api.put('/data/albums/' + id, article)
}

export async function deleteArticle(id){
    return api.del('/data/albums/' + id)
}
