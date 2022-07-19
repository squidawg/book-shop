import createElement from "./CreateElement.js";

const bordered_box = document.querySelector('.border_box');
const box_inner = document.querySelector('.border_inner');
const cart_inner = document.querySelector('.cart_inner');
const shelf_inner = document.querySelector('.shelf');
const delivery_info = document.querySelector('.cart_container');
const cart = document.querySelector('.cart');


let currentCard = '';


let data = '';
let result = 0;


let arr = [];

    window.addEventListener('load', () => {
        const cards = document.querySelectorAll('.card');
        bordered_box.addEventListener('drop', dragDrop);
        bordered_box.addEventListener('dragover', dragOver);

        cards.forEach(function (element) {
            element.addEventListener('dragstart', dragStart);
            element.childNodes[1].lastChild.addEventListener('click', function () {
                currentCard = document.getElementById(this.closest('.card').id);
                data = currentCard.cloneNode(true);
            });
            element.childNodes[1].lastChild.addEventListener('click', function () {
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
            if (!bordered_box.classList.contains('active')) {
                bordered_box.className += ' active';
            }
            currentCard = this;

        }

        function dragOver(e) {
            e.preventDefault();

        }

        function dragDrop() {
            let cloneCurrentCard = currentCard.cloneNode(true);
            addToCart(cloneCurrentCard);

        }







        function cartTemplate(img, title, author, price, id) {
            const card = createElement('div', 'card');
            card.id = id;
            const cardInner = createElement('div', 'card_inner');
            const cardInnerWrapper = createElement("div", "card_inner_wrapper");
            const removeButton = createElement('button', "button_remove");
            removeButton.id = id;
            
            removeButton.addEventListener('click', function (elem) {
                let cost = elem.target.previousElementSibling.lastChild.lastChild;
                result -= +cost.innerHTML.replace(/\D/g, "");
                updateCart(result);
                elem.target.parentElement.remove();
                arr.map(element => elem.target.id === element.id ? arr.splice(arr.indexOf(element), 1) : false);
                if (bordered_box.childNodes.length === 1) {
                    bordered_box.className = 'border_box';
                    box_inner.style.display = "flex";

                }
            });

            cardInner.append(title, author, price);
            cardInnerWrapper.append(img, cardInner);
            card.append(cardInnerWrapper, removeButton);

            return card;
        }

        function cartPush(img, title, author, price, clone) {
            arr.push(cartTemplate(img, title, author, price, clone));
            bordered_box.append(cartTemplate(img, title, author, price, clone));

        }

        function cartTotal(price) {
            const totalWrapper = createElement('div', 'total_wrapper');
            const innerWrapper = createElement('div', 'total_inner');

            const totalCount = createElement('h2', 'total_count');
            const checkoutButton = createElement('button', 'button');
            const totalName = createElement('h2', 'total_name');

            totalName.innerHTML = 'total: $';
            checkoutButton.innerHTML = 'Checkout';
            totalCount.innerText += price;

            innerWrapper.append(totalName, totalCount);
            totalWrapper.append(innerWrapper, checkoutButton);
            cart_inner.append(totalWrapper);

            checkoutButton.addEventListener('click', function () {
                let checkout_obj = {}
                let total_sum = totalCount.innerText;
                for(let i = 1; i < bordered_box.childNodes.length; i++){
                    let key = bordered_box.childNodes[i].firstChild.lastChild.firstChild.innerText;
                    let value = bordered_box.childNodes[i].firstChild.lastChild.lastChild.innerText.replace(/\D/g, "");
                    checkout_obj[key] = value;
                }
                 sessionStorage.setItem('test', JSON.stringify(checkout_obj));
                 sessionStorage.setItem('total', total_sum);
                 location.href = 'checkout-form.html';

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

            if (!bordered_box.classList.contains('drop_area')) {
                bordered_box.className += ' drop_area';
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




