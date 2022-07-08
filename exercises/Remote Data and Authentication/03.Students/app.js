let url = 'http://localhost:3030/jsonstore/collections/students'
let table = document.querySelector('#results tbody')
let form = document.querySelector('form')

window.addEventListener('load', loadStudents)
form.addEventListener('submit', addStudents)

async function loadStudents() {
    try {
        let response = await fetch(url)
        
        if(response.status != 200){
            throw new Error("Can't fetch data")
        }

        let data = await response.json()

        Object.values(data).forEach(r => {
            let student = createElement('tr',  
            createElement('td', r.firstName),
            createElement('td', r.lastName),
            createElement('td', r.facultyNumber),
            createElement('td', r.grade),
            )

            table.appendChild(student)
        })

    }catch (error) {
        alert(error.message)
    }
}

async function addStudents(e) {
    e.preventDefault()

    let dataFrom = new FormData(form)
    let info = [...dataFrom.values()]

    let gradeNumber = Number(info[3].trim())

    table.replaceChildren()

    try {
        let response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: info[0],
                lastName: info[1],
                facultyNumber: info[2],
                grade: gradeNumber
            })
        })
        if(response.ok == false){
            throw new Error('Cant create new record')
        }

        loadStudents()
    }catch (error){
        alert(error.message)
    }
}

function createElement(type, ...content) {
    let el = document.createElement(type)
    content.forEach(c => {
        if(typeof c === 'number' || typeof c === 'string'){
            c = document.createTextNode(c)
        }
        el.appendChild(c)
    })

    return el
}