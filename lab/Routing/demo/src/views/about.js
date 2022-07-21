import {html} from '../../node_modules/lit-html/lit-html.js'


const aboutTemplate = () => html `
<h2>About Page</h2>
<p>Contact: </p>
`

export function showAbout(ctx) {
    ctx.render(aboutTemplate())
}