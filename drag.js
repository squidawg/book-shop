const box = document.querySelector('.border_box');
const box_inner = document.querySelector('.border_inner');
const cart_inner = document.querySelector('.cart_inner');

let arr = [];


    window.addEventListener('load', () => {
            const cards = document.querySelectorAll('.card');
            box.addEventListener('drop', dragDrop);
            box.addEventListener('dragover', dragOver);

            cards.forEach(function (element) {
                element.addEventListener('dragstart', dragStart);
                element.childNodes[1].lastChild.addEventListener('click', function () {
                    access = this;
                    start = document.getElementById(access.closest('.card').id);
                    data = start.cloneNode(true);
                })
                element.childNodes[1].lastChild.addEventListener('click', function () {
                    let id = data.id
                    let img = data.childNodes[0].firstChild;
                    let title = data.childNodes[0].lastChild.firstChild;
                    let author = data.childNodes[0].lastChild.childNodes[1];
                    let price = data.childNodes[0].lastChild.lastChild;

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


                })
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
                let img = clone.firstChild.childNodes[0];
                let title = clone.firstChild.lastChild.childNodes[0];
                let author = clone.firstChild.lastChild.childNodes[1];
                let price = clone.firstChild.lastChild.childNodes[2];

                if (!box.classList.contains('drop_area')) {
                    box.className += ' drop_area';
                }

                box_inner.style.display = "none";
                let test = arr.some(element => element.id === clone.id);
                if (!test) {
                    cartPush(img, title, author, price, clone.id);
                    result += +price.innerHTML.replace(/\D/g, "");
                    updateCart(result);


                }

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

                totalCheckout.addEventListener('click', function () {
                    info = arr;

                });

                totalCheckout.addEventListener('click', function () {
                    location.href = "delivery_form.html";
                });


                totalName.innerHTML = 'total: $';
                totalCheckout.innerHTML = 'Checkout';
                totalCount.innerText += price;

                innerWrapper.append(totalName, totalCount,);
                totalWrapper.append(innerWrapper, totalCheckout);
                cart_inner.append(totalWrapper);
            }

            function updateCart(price) {
                let total = document.querySelector('.total_count');
                total.innerHTML = price;
                if (total.innerHTML < 1) {
                    total.closest('.total_wrapper').remove();

                }
            }
        });



