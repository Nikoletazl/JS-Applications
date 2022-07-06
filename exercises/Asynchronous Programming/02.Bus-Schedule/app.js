function solve() {
    let infoEl = document.querySelector('.info')
    let departBtn = document.getElementById('depart')
    let arriveBtn = document.getElementById('arrive')

    let busStop = {
        next: 'depot'
    }

    function depart() {
        departBtn.disabled = true
        let url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                busStop =JSON.parse(JSON.stringify(data))
                infoEl.textContent = `Next stop ${busStop.name}`
            })
            .catch(error => {infoEl.textContent = 'Error'})
        arriveBtn.disabled = false
    }

    function arrive() {
        infoEl.textContent = `Arriving at ${busStop.name}`
        departBtn = false
        arriveBtn = true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();