import createElement from "./CreateElement.js";

const box = document.querySelector('.border_box');
const box_inner = document.querySelector('.border_inner');
const cart_inner = document.querySelector('.cart_inner');
const shelf_inner = document.querySelector('.shelf');
const delivery_info = document.querySelector('.cart_container');
const cart = document.querySelector('.cart');
const query_header = document.querySelector('.header');


let start = '';


let data = '';
let result = 0;


let arr = [];

if(document.title === 'Book_shop') {
    window.addEventListener('load', () => {
        const cards = document.querySelectorAll('.card');
        box.addEventListener('drop', dragDrop);
        box.addEventListener('dragover', dragOver);

        cards.forEach(function (element) {
            element.addEventListener('dragstart', dragStart);
            element.childNodes[1].lastChild.addEventListener('click', function () {
                start = document.getElementById(this.closest('.card').id);
                data = start.cloneNode(true);
            });
            element.childNodes[1].lastChild.addEventListener('click', function (){
                addToCart(data)
            });
        });


        const card_id = document.querySelectorAll('.card');
        let i = 1;
        card_id.forEach(function (element) {
            element.id = i;
            i++;
        });

        function dragStart() {
            if (!box.classList.contains('active')) {
                box.className += ' active';
            }
            start = this;

        }

        function dragOver(e) {
            e.preventDefault();

        }

        function dragDrop() {
            let clone = start.cloneNode(true);
            addToCart(clone);

        }

        function cartTemplate(img, title, author, price, id) {
            const card = createElement('div', 'card');
            card.id = id;
            const card_inner = createElement('div', 'card_inner');
            const card_inner_wrapper = createElement("div", "card_inner_wrapper");
            const remove = createElement('button', "button_remove");
            remove.id = id;
            remove.addEventListener('click', function (elem) {
                let cost = elem.target.previousElementSibling.lastChild.lastChild;
                result -= +cost.innerHTML.replace(/\D/g, "");
                updateCart(result);
                elem.target.parentElement.remove();
                arr.map(element => elem.target.id === element.id ? arr.splice(arr.indexOf(element), 1) : false);
                if (box.childNodes.length === 1) {
                    box.className = 'border_box';
                    box_inner.style.display = "flex";

                }
            });


            card_inner.append(title, author, price);
            card_inner_wrapper.append(img, card_inner);
            card.append(card_inner_wrapper, remove);

            return card;
        }

        function cartPush(img, title, author, price, clone) {
            arr.push(cartTemplate(img, title, author, price, clone));
            box.append(cartTemplate(img, title, author, price, clone));

        }

        function cartTotal(price) {
            const totalWrapper = createElement('div', 'total_wrapper');
            const innerWrapper = createElement('div', 'total_inner');

            const totalCount = createElement('h2', 'total_count');
            const totalCheckout = createElement('button', 'button');
            const totalName = createElement('h2', 'total_name');

            totalName.innerHTML = 'total: $';
            totalCheckout.innerHTML = 'Checkout';
            totalCount.innerText += price;

            innerWrapper.append(totalName, totalCount,);
            totalWrapper.append(innerWrapper, totalCheckout);
            cart_inner.append(totalWrapper);

            totalCheckout.addEventListener('click', function () {
                let checkout_obj = {}
                //let test_arr = [];
                let total_sum = totalCount.innerText;
                for(let i = 1; i < box.childNodes.length; i++){
                    let key = box.childNodes[i].firstChild.lastChild.firstChild.innerText;
                    let value = box.childNodes[i].firstChild.lastChild.lastChild.innerText.replace(/\D/g, "");
                    checkout_obj[key] = value;
                }
                 sessionStorage.setItem('test', JSON.stringify(checkout_obj));
                 sessionStorage.setItem('total', total_sum);
                 location.href = 'checkout.html';

            });
        };

        function updateCart(price) {
            let total = document.querySelector('.total_count');
            total.innerHTML = price;
            if (total.innerHTML < 1) {
                total.closest('.total_wrapper').remove();

            }
            ;
        };

        function checkoutText(card) {
            let title = card.firstChild;
            let author = card.childNodes[1];
            let price = card.lastChild;

            const item = createElement('div', 'item');
            const book_title = createElement('h3', 'book_title');
            const book_author = createElement('h3', 'book_author');
            const book_price = createElement('h3', 'book_price');

            book_title.append(title);
            book_author.append(author);
            book_price.append(price);
            item.append(book_title, book_author, book_price);
            return item;

        }

        function addToCart(element) {
            let id = element.id;
            let img = element.childNodes[0].firstChild;
            let title = element.childNodes[0].lastChild.firstChild;
            let author = element.childNodes[0].lastChild.childNodes[1];
            let price = element.childNodes[0].lastChild.lastChild;

            if (!box.classList.contains('drop_area')) {
                box.className += ' drop_area';
                cartTotal(result);
            }

            box_inner.style.display = "none";
            let test = arr.some(element => element.id === id);
            if (!test) {
                cartPush(img, title, author, price, id);
                result += +price.innerHTML.replace(/\D/g, "");
                updateCart(result);
            }
        }

    });
}



