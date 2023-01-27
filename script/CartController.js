import createElement from "./CreateElement.js";

export function initCart(){
    const bordered_box = document.querySelector('.border_box');
    const box_inner = document.querySelector('.border_inner');
    const cart_inner = document.querySelector('.cart_inner');

    let currentCard = '';
    let totalCart = 0;
    let arr = [];
    const cards = document.querySelectorAll('.card');
    bordered_box.addEventListener('dragover', dragOver);
    bordered_box.addEventListener('drop', dragDrop);
    let i = 1;
    cards.forEach(function (element) {
        element.id = i;
        i++;
        element.addEventListener('dragstart', dragStart);
        element.querySelector('.button').addEventListener('click', function () {
            currentCard = document.getElementById(this.closest('.card').id);
            let cloneCurrentCard = currentCard.cloneNode(true);
            addToCart(cloneCurrentCard)
        });
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
            let cost = elem.target.previousElementSibling.querySelector('.book_price');
            totalCart -= +cost.innerHTML.replace(/\D/g, "");
            updateCartPrice(totalCart);
            elem.target.parentElement.remove();
            // check for duplicate book in cart
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
                let key = bordered_box.childNodes[i].querySelector('.book_title').innerText;
                let value = bordered_box.childNodes[i].querySelector('.book_price').innerText.replace(/\D/g, "");
                checkout_obj[key] = value;
            }
            //is this the right way to transfer data between pages?
            sessionStorage.setItem('items', JSON.stringify(checkout_obj));
            sessionStorage.setItem('total', total_sum);
            location.href = 'checkout-form.html';
        });
    }

    function updateCartPrice(price) {
        let total = document.querySelector('.total_count');
        total.innerHTML = price;
        if (total.innerHTML < 1) {
            total.closest('.total_wrapper').remove();
        }
    }

    function addToCart(element) {
        let id = element.id;
        let img = element.querySelector('.book_image');
        let title = element.querySelector('.book_title');
        let author = element.querySelector('.book_author');
        let price = element.querySelector('.book_price');

        if (!bordered_box.classList.contains('drop_area')) {
            bordered_box.className += ' drop_area';
            cartTotal(totalCart);
        }

        box_inner.style.display = "none";
        let test = arr.some(element => element.id === id);
        if (!test) {
            cartPush(img, title, author, price, id);
            totalCart += +price.innerHTML.replace(/\D/g, "");
            updateCartPrice(totalCart);
        }
    }
}