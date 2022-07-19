import {ExpandBtnModal} from './ExpandBtnModal.js';
import createElement from "./CreateElement.js";


const WRAPPER = document.querySelector('.wrapper');
const BODY = document.querySelector('body');


const HEADER = createElement('header', "header");
const FOOTER = createElement('footer', 'footer');


const SHELF = createElement('div', 'shelf', 'inner_wrapper');
SHELF.id = "shelf";
const SHELF_INNER = createElement('div', "shelf_inner");
const SHELF_TITLE = createElement('div', "shelf_title");

const CART = createElement('div', 'cart', 'inner_wrapper');
const CART_INNER = createElement('div', "cart_inner");
const CART_WRAPPER = createElement('div', 'cart_wrapper');

const cart_title = createElement('h2', 'cart_title');
cart_title.innerText = 'Cart';


const BORDERED_BOX = createElement('div', "border_box");
BORDERED_BOX.id = 'border_box';
const border_inner = createElement('div', "border_inner");


const border_title = createElement('h2', "border_title");
border_title.innerText = "Drop here";


const drag = createElement('span', 'drag-n-drop');


border_inner.append(border_title, drag);
BORDERED_BOX.append(border_inner);
CART_WRAPPER.append(cart_title);
CART_INNER.append(BORDERED_BOX);
CART.append(CART_WRAPPER, CART_INNER);
WRAPPER.append(SHELF, CART);
BODY.append(HEADER, WRAPPER, FOOTER);
let books;

async function readJSON() {
    const response = await fetch("book.json");
    const json = await response.json();
    books = json;
}


const renderModalWindow = (content) => {
    let modal = new ExpandBtnModal();
    modal.buildModal(content);
};

const generateToolsModal = (name, link, book_name, book_price, book_description) => {
    renderModalWindow(createModalContent(name, link, book_name, book_price, book_description));
};

const createModalContent = (name, link, book_name, book_price, book_description) => {

    const wrapper__modal = createElement("div", 'wrapper-modal-content');
    const wrapper__inner__modal = createElement("div", 'wrapper-modal-content__inner-modal');
    const header = createElement('div', 'modal__header');

    const img = document.createElement("img");
    img.src = link;
    img.classList.add("modal-content__image");


    const title = createElement("h2", 'modal__title');
    title.innerText = book_name;
    const author = createElement('h3', 'modal__author');
    author.innerText = name;
    const description = createElement("p", 'modal__description');
    description.innerText = book_description;
    const price = createElement('h2', 'modal-content__price');
    price.innerText = book_price;

    header.append(title, author);
    wrapper__inner__modal.append(header, description);
    wrapper__modal.append(img, wrapper__inner__modal);


    return wrapper__modal;
};

function header() {
    const header_wrapper = createElement('div', 'header_wrapper');
    const wrapper = createElement('div', 'wrapper');
    const header_promo_img = createElement('img', "header_promo_img");
    const header_title = createElement('h1', 'header_title');
    const header_description = createElement('p', 'header_description');
    const button_promo = createElement('button', 'button_promo');
    button_promo.innerText = "To catalog";
    button_promo.addEventListener('click', function () {
        document.getElementById('shelf').scrollIntoView({
            behavior: 'smooth'
        });
    });

    header_title.innerText = 'Book shop';
    header_description.innerText = 'Connecting readers with independent booksellers all over the world.';
    header_promo_img.src = '../icons/book_logo.png';

    header_wrapper.append(header_title, header_description, button_promo);
    wrapper.append(header_promo_img, header_wrapper);
    HEADER.append(wrapper);

    }

function footer() {
    const footer_inner = createElement('div', 'footer_inner');
    const footer_link = createElement('a', 'footer_link');
    footer_link.href = 'https://github.com/squidawg';
    const footer_git = createElement('span', 'footer_git');
    const footer_year = createElement('h2', 'footer_year');
    footer_year.innerText = '2022';

    footer_link.append(footer_git);
    footer_inner.append(footer_link, footer_year);
    FOOTER.append(footer_inner);

}


function generateCardAppend() {
    const shelf_title = createElement('h2', 'shelf_title');
    shelf_title.innerText = 'Catalog';
    books.forEach(function (element){
        let name = element.author;
        let img = element.imageLink;
        let title = element.title;
        let price = element.price;
        let description = element.description;

        let card = createCardTemplate(name, img, title, price, description);
        card.draggable = 'true';
        SHELF_INNER.appendChild(card);
    });
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

    const expand = createElement('button',  "button_expand");
    expand.addEventListener("click", () =>
        generateToolsModal(name, link, book_name, book_price, book_description));


    buttons.append(expand, btn);
    card_inner.append(title, author, price);
    card_inner_wrapper.append(img, card_inner);
    card.append(card_inner_wrapper, buttons);

    return card;

};

async function init() {
    await readJSON();
    generateCardAppend();
    header();
    footer();
}

init();
