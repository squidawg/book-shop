const WRAPPER = document.querySelector('.wrapper');


const SHELF = createElement('div', 'shelf' , 'inner_wrapper');
const SHELF_INNER = createElement('div', "shelf_inner" );
const SHELF_TITLE = createElement('div', "shelf_title" );


const CART = createElement('div', 'cart', 'inner_wrapper');
const CART_INNER = createElement('div', "cart_inner");
const CART_TITLE = createElement('div','cart_wrapper');


const cart_title = createElement('h2', 'cart_title');
cart_title.innerText = 'Cart';


const BORDER_BOX = createElement('div', "border_box");
const drag = createElement('span', 'drag-n-drop');
BORDER_BOX.append(drag)
CART_TITLE.append(cart_title);
CART_INNER.append(BORDER_BOX);
CART.append(CART_TITLE, CART_INNER);
WRAPPER.append(SHELF, CART);
let books;


async function readJSON() {
    const response = await fetch("book.json");
    const json = await response.json();
    books = json;
}


function createElement(tag, ...classList) {
    const element = document.createElement(tag);
    element.classList.add(...classList);
    return element;
}


function generateCardAppend() {
    const shelf_title = createElement('h2', 'shelf_title');
    shelf_title.innerText = 'Catalog';
    for (let i = 0; i < books.length; i++) {
        let name = books[i].author;
        let img = books[i].imageLink;
        let title =  books[i].title;
        let price = books[i].price;
        let description = books[i].description;

        let card = createCardTemplate(name, img, title, price, description);
        SHELF_INNER.appendChild(card);
    }
    SHELF_TITLE.append(shelf_title);
    SHELF.append(SHELF_TITLE, SHELF_INNER);
}


const createCardTemplate = (name, link, book_name, book_price, book_description) => {
    const card = createElement('div', 'card');
    const card_inner = createElement('div', 'card_inner');
    const buttons = createElement('div', 'card_buttons');
    const card_inner_wrapper = createElement("div", "card_inner_wrapper");

    const img = createElement("img", "book_image");
    img.src = link;

    const author = createElement("h4", "book_author");
    author.innerText = name;

    const title = createElement("h4", "book_title");
    title.innerText = book_name;

    const price = createElement('h4', "book_price");
    price.innerText = `Price: $${book_price}`;


    const btn = createElement("button", "button");
    btn.innerText = "Add to cart";

    const expand = createElement('button', "button_expand");

    buttons.append(expand, btn);
    card_inner.append(title, author, price);
    card_inner_wrapper.append(img, card_inner);
    card.append(card_inner_wrapper, buttons);

    return card;

}


async function init(){
    await readJSON();
    generateCardAppend();
}


init();