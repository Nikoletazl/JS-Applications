let loadBookButton = document.querySelector('#loadBooks')
let url = 'http://localhost:3030/jsonstore/collections/books'
let tbody = document.getElementsByTagName('tbody')[0]
let form = document.getElementsByTagName('form')[0]

loadBookButton.addEventListener('click', loadBooks)

form.addEventListener('submit', function (e) {
    e.preventDefault()
})

async function loadBooks() {
    try {
        let response = await fetch(url)

        if(response.status != 200){
            throw new Error('Problem loading data.')
        }

        let data = await response.json()
        let entries = Object.entries(data)

        tbody.innerHTML = ''

        for(let [key, {author, title}] of entries){
            let tr = document.createElement('tr')
            let titleEl = document.createElement('td')
            titleEl.textContent = title
            let authorTd = document.createElement('td')
            authorTd.textContent = author

            tr.appendChild(titleEl)
            tr.appendChild(authorTd)

            let newTd = document.createElement('td')
            let editBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')
            
            editBtn.textContent = 'Edit'
            editBtn.addEventListener('click', edit)
            deleteBtn.textContent = 'Delete'
            deleteBtn.addEventListener('click', onDelete)
            
            newTd.appendChild(editBtn)
            newTd.appendChild(deleteBtn)
            
            tr.appendChild(newTd)
            tbody.appendChild(tr)

            function edit() {
                
            }

            function onDelete(e){
                e.preventDefault()
                fetch(`${url}/${key}`, {
                    method: 'delete'
                })

                tr.remove()
            }

        }
    } catch (error) {
        
    }
}