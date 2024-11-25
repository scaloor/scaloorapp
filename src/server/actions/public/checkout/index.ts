import 'server-only'
import { readFileSync } from 'fs'


export async function buildCheckoutHtml() {
    const html = readFileSync('src/server/actions/public/checkout/checkout-template.html', 'utf8')
    return html
}