import createElement from "./CreateElement.js";
import {ExpandBtnModal} from "./ExpandBtnModal.js";

export const renderModalWindow = (content) => {
    let modal = new ExpandBtnModal();
    modal.buildModal(content);
};

export const generateToolsModal = (...elements) => {
    renderModalWindow(createModalContent(...elements));
};

export const createModalContent = (...elements) => {
    const wrapper__modal = createElement("div", 'wrapper-modal-content');
    const wrapper__inner__modal = createElement("div", 'wrapper-modal-content__inner-modal');
    const header = createElement('div', 'modal__header');

    const img = document.createElement("img");
    img.src = elements[1]
    img.classList.add("modal-content__image");

    const title = createElement("h2", 'modal__title');
    title.innerText = elements[2]
    const author = createElement('h3', 'modal__author');
    author.innerText = elements[0]
    const description = createElement("p", 'modal__description');
    description.innerText = elements[4]
    const price = createElement('h2', 'modal-content__price');
    price.innerText = elements[3]

    header.append(title, author);
    wrapper__inner__modal.append(header, description);
    wrapper__modal.append(img, wrapper__inner__modal);

    return wrapper__modal;
};