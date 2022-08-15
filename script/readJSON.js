import {footer, header} from "./CreateContent.js";
import {initCart} from "./CartController.js";
import {generateCardAppend} from "./CreateContent.js";
export let books;

async function readJSON() {
    const response = await fetch("../book.json");
    const json = await response.json();
    books = json;
}

export async function init() {
    await readJSON();
    generateCardAppend();
    header();
    footer();
    initCart();
}