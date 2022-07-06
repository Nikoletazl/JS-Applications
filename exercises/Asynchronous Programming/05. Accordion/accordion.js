async function solution() {
    try {
        let url = 'http://localhost:3030/jsonstore/advanced/articles/list'
        let response = await fetch(url)

        if(!response.ok) {
            throw new Error('Error obtaining article list')
        }

        let data = await response.json()

        data.forEach(article => {
            let articleInfo = document.createElement('div')
            articleInfo.classList.add('accordion')
            articleInfo.innerHTML = `
            <div class="head">
                <span>${article}</span>
                <button class="button" id="${article.id}" onclick="moreOnClick(event)">More</button>
            </div>
            <div class="extra"></div> 
            `
            let main = document.getElementById('main')
            main.appendChild(articleInfo)
        });
    }catch (error) {
        console.log(error)
    }
}

async function moreOnClick(e) {
    try {
        let currentTarget = e.currentTarget
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${currentTarget.id}`
        let parent = currentTarget.parentNode.parentNode
        let extraDiv = parent.querySelector('div.extra')

        let response = await fetch(url)

        if(!response.ok) {
            throw new Error('Error obtaining article details')
        }

        let data = await response.json()

        extraDiv.innerHTML = `<p>${data.content}</p>`

        if(currentTarget.textContent == 'More'){
            currentTarget.textContent = 'Less'
            extraDiv.style.display = 'block'
        }else {
            currentTarget.textContent = 'More'
            extraDiv.style.display = 'none'
        }
    }catch (error) {
        console.log(error)
    }
}