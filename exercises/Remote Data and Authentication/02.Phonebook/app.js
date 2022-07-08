function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', load)
    document.querySelector('#btnCreate').addEventListener('click', create)
    document.querySelector('#phonebook').addEventListener('click', onDelete)
}

let phonebook = document.querySelector('#phonebook')

let url = 'http://localhost:3030/jsonstore/phonebook'

function create() {
    let name = document.querySelector('#person')
    let number = document.querySelector('#phone')

    if(!name.value || !number.value){
        return
    }

    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            person: name.value.trim(),
            phone: number.value.trim()
        })
    })
    .then(res => res.json())
    .catch(err => alert(err.message))

    name.value = ''
    number.value = ''
}

function load () {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            phonebook.replaceChildren()
            Object.values(data).forEach(p => {
                let liEl = document.createElement('li')
                liEl.textContent = `${p.person}: ${p.phone}`
                let deleteBtn = document.createElement('button')
                deleteBtn.textContent = 'Delete'
                deleteBtn.setAttribute('id', p._id)
                
                liEl.appendChild(deleteBtn)
                phonebook.appendChild(liEl)
            })
        })
}

function onDelete(e) {
    let currId = e.target.id
    if (e.target.textContent == 'Delete') {
        fetch(`${url}/${currId}`, {
            method: 'delete'
        })
        .then(res => {
            load()
            return res.json()
        })
        .catch(err => alert(err.message))
    }
}

attachEvents();