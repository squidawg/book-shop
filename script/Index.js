import createElement from "./CreateElement.js";
import {header, footer} from "./CreateContent.js";
import {init} from './readJSON.js'

const PROJECT_WRAPPER = document.querySelector('.project-wrapper');
const WRAPPER = document.querySelector('.wrapper');
export const HEADER = createElement('header', "header");
export const FOOTER = createElement('footer', 'footer');

export const SHELF = createElement('div', 'shelf', 'inner_wrapper');
SHELF.id = "shelf";

export const SHELF_INNER = createElement('div', "shelf_inner");
export const SHELF_TITLE = createElement('div', "shelf_title");
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
PROJECT_WRAPPER.append(HEADER, WRAPPER, FOOTER);


init();
