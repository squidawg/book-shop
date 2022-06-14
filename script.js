const WRAPPER = document.querySelector('.wrapper')
const SHELF = createElement('div', 'shelf' );
const CART = createElement('div', 'cart');
WRAPPER.append(SHELF, CART);
let books;

//read from json
async function readJSON() {
    const response = await fetch("book.json");
    const json = await response.json();
    books = json;
}

function createElement(tag, classList) {
    const element = document.createElement(tag);
    element.classList.add(classList);
    return element;
}



function generateCardAppend() {
    for (let i = 0; i < 10; i++) {
        let name = books[i].author;
        let img = books[i].imageLink;
        let title =  books[i].title;
        let price = books[i].price;
        let description = books[i].description;

        let card = createCardTemplate(name, img, title, price, description);
        SHELF.appendChild(card);
    }
}


const createCardTemplate = (name, link, book_name, book_price, book_description) => {
    const card = createElement('div', 'card')
    const card_inner = createElement('div', 'card_inner')
    const buttons = createElement('div', 'card_buttons')

    const img = createElement("img", "book_image");
    img.src = link;

    const author = createElement("h4", "book_author");
    author.innerText = name;

    const title = createElement("h4", "book_title");
    title.innerText = book_name;

    const price = createElement('h4', "book_price");
    price.innerText = `Price: ${book_price}`;


    const btn = createElement("button", "button");
    btn.innerText = "Add to cart";

    const expand = createElement('button', "button_expand")

    buttons.append(expand, btn)
    card_inner.append(title, author, price)
    card.append(img, card_inner, buttons)

    return card;

}


// json to be read and generate book card
async function init(){
    await readJSON();
    generateCardAppend();
}

init()
