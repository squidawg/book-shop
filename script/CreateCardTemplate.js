import createElement from "./CreateElement.js";
import {generateToolsModal} from "./RenderModalWindow.js";

export const createCardTemplate = (...elements) => {
    const card = createElement('div', 'card');
    const card_inner = createElement('div', 'card_inner');
    const buttons = createElement('div', 'card_buttons');
    const card_inner_wrapper = createElement("div", "card_inner_wrapper");

    const img = createElement("img", "book_image");
    img.src = elements[1];

    const author = createElement("h4", "book_author");
    author.innerText = elements[0];

    const title = createElement("h4", "book_title");
    title.innerText = elements[2];
    const price = createElement('h4', "book_price");

    price.innerText = `Price: $${elements[3]}`;
    const btn = createElement("button", "button");
    btn.innerText = "Add to cart";
    const expand = createElement('button',  "button_expand");
    expand.addEventListener("click", () =>
        generateToolsModal(...elements));

    buttons.append(expand, btn);
    card_inner.append(title, author, price);
    card_inner_wrapper.append(img, card_inner);
    card.append(card_inner_wrapper, buttons);

    return card;

};

