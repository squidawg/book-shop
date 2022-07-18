import createElement from "./CreateElement.js";
import {NewModal} from "./NewModal.js";
const cart_total = document.querySelector('.cart_total');
let form = document.querySelector('form');
const btn_submit = document.querySelector('.button_submit');
const payment_wrapper = document.querySelector('.payment_wrapper');


if(document.title === 'Checkout') {
    let data = JSON.parse(sessionStorage.getItem('test'));
    let total = sessionStorage.getItem('total');
    window.addEventListener('load', () => {
        const gift = document.querySelector('.gift');
        const cart_container = document.querySelector('.cart_container');
        let i = 1;

        Object.keys(data).forEach(element => {
            const item = createElement('div', 'item');
            const book_name = createElement('p', 'item_name');
            const book_price = createElement('p', 'item_price');
            book_name.innerHTML = `${i} ${element}`;
            book_price.innerHTML =  `$${data[element]}`;
            item.append(book_name, book_price);
            cart_container.append(item);
            i++;
        });
        cart_total.append(total);

        gift.addEventListener('click', function () {
            let checks = document.querySelectorAll('input[type=checkbox]:checked');
            let checked = document.querySelectorAll('input[type=checkbox]');
            checked.forEach(function (element) {
                if (checks.length === 2 && element.checked === false) {
                    element.disabled = true;
                    element.required = true;
                } else if (checks.length < 2) {
                    element.disabled = false;
                }

            });
        });

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        document.getElementById('input-date').setAttribute('min', tomorrow.toISOString().split('T')[0]);

        const checkForm = document.getElementById('delivery');
        checkForm.addEventListener("change", () => {
            document.getElementById('button_submit').disabled = !checkForm.checkValidity();

        });

        btn_submit.addEventListener('click',(e) => {
               e.preventDefault();
               let formData = new FormData(form);
               generateModal(formData);
           });

        const renderModalWin = (content) => {
            let modal = new NewModal('complete-modal');
            modal.buildModal(content);
            payment_wrapper.setAttribute("style","display:none;");
        };

        const generateModal = (formData) =>{
            renderModalWin(completeModalContent(formData));
        };
        // : to do
        const completeModalContent = (formData) => {
            let fName = formData.get('firstName');
            let lName = formData.get('lastName');
            let date = formData.get('date');
            let streetName = formData.get('street');
            let house = formData.get('house');
            let flatNumber = formData.get('flatNumber');

            const wrapper__modal = createElement("div", 'modal_complete');
            const description = createElement('div', 'order_description');

            const name = createElement('h3', 'description_name');
            name.innerText = `Dear, ${fName} ${lName}!`;

            const description_date = createElement('h3', 'description_date');
            description_date.innerText = `Your order will be delivered on ${date}`;

            const address = createElement('h3', 'description_address');
            address.innerText = `at ${streetName} str. ${house} apt. ${flatNumber}`;

            const title = createElement('h2', 'title_complete');
            title.innerText = ' Your order is Confirmed!';

            const closeButton = createElement('btn', 'button_complete');
            const inner_button = createElement('p', 'button_text');
            inner_button.innerText = 'Complete';
            closeButton.addEventListener('click', () => {
                location.href='index.html';
            });


            closeButton.append(inner_button);
            description.append(name, description_date, address);
            wrapper__modal.append(title, description, closeButton);

            return wrapper__modal;


        };


    });
}