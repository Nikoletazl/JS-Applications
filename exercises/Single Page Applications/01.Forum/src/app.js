import { showHome } from "./home.js";


window.showHome = showHome

document.getElementById('homeLink').addEventListener('click', showHome)
showHome()