import createElement from "./CreateElement.js";
import {HEADER, FOOTER} from "./Index.js";
import {books} from "./readJSON.js";
import {createCardTemplate} from "./CreateCardTemplate.js";
import {SHELF, SHELF_TITLE, SHELF_INNER} from "./Index.js";

export function header() {
    const header_wrapper = createElement('div', 'header-wrapper');
    const wrapper = createElement('div', 'wrapper');
    const header_promo_img = createElement('img', "header-promo-img");
    const header_title = createElement('h1', 'header-title');
    const header_description = createElement('p', 'header-description');
    const button_promo = createElement('button', 'button_promo');

    button_promo.innerText = "To catalog";
    button_promo.addEventListener('click', function () {
        document.getElementById('shelf').scrollIntoView({
            behavior: 'smooth'
        });
    });

    header_title.innerText = 'Book shop';
    header_description.innerText = 'Connecting readers with independent booksellers all over the world.';
    header_promo_img.src = '../icons/bookLogo.png';
    header_promo_img.alt = 'promo_image';

    header_wrapper.append(header_title, header_description, button_promo);
    wrapper.append(header_promo_img, header_wrapper);
    HEADER.append(wrapper);
}

export function footer() {
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

export function generateCardAppend() {
    const shelf_title = createElement('h2', 'shelf_title');
    shelf_title.innerText = 'Catalog';
    books.forEach(function (element){
        const name = element.author;
        const img = element.imageLink;
        const title = element.title;
        const price = element.price;
        const description = element.description;

        const card = createCardTemplate(name, img, title, price, description);
        card.draggable = 'true';
        SHELF_INNER.appendChild(card);
    });
    SHELF_TITLE.append(shelf_title);
    SHELF.append(SHELF_TITLE, SHELF_INNER);
}