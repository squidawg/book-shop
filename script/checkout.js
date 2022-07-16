import createElement from "./CreateElement.js";
import {NewModal} from "./NewModal.js";
const cart_total = document.querySelector('.cart_total');
let form = document.querySelector('form');
const btn_submit = document.querySelector('.button_submit');


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
            let modal = new NewModal('tools-modal');
            modal.buildModal(content);
        };

        const generateModal = (formData) =>{
            renderModalWin(completeModalContent(formData));
        };
        // : to do
        const completeModalContent = (formData) => {
            const wrapper__modal = createElement("div", 'wrapper-modal-content');
            const wrapper__inner__modal = createElement("div", 'wrapper-modal-content__inner-modal');

            let fName = formData.get('firstName');
            let lName = formData.get('lastName');
            let date = formData.get('date');
            let streetName = formData.get('street');
            let house = formData.get('house');
            let flatNumber = formData.get('flatNumber');

            wrapper__inner__modal.append(fName, lName, date, streetName, house, flatNumber );

            return wrapper__inner__modal;


        };


    });
}