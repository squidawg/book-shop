import createElement from "./CreateElement.js";
import {ConfirmOrderModal} from "./ConfirmOrderModal.js";

const cart_total = document.querySelector('.cart_total');
let form = document.querySelector('form');
const btn_submit = document.querySelector('.button_submit');
const payment_wrapper = document.querySelector('.payment_wrapper');


if(document.title === 'Checkout') {
    let data = JSON.parse(sessionStorage.getItem('test'));
    let total = sessionStorage.getItem('total');
    window.addEventListener('load', () => {
        const checkbox = document.querySelector('.gift');
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

        checkbox.addEventListener('click', function () {
            let checkedElements = document.querySelectorAll('input[type=checkbox]:checked');
            let checkboxElements = document.querySelectorAll('input[type=checkbox]');
            checkboxElements.forEach(function (element) {
                if (checkedElements.length === 2 && element.checked === false) {
                    element.disabled = true;
                    element.required = true;
                } else if (checkedElements.length < 2) {
                    element.disabled = false;
                }
            });
        });

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        document.getElementById('input-date').setAttribute('min',
            tomorrow.toISOString().split('T')[0]);

        const checkForm = document.getElementById('delivery');
        checkForm.addEventListener('change', ()=>{
            const check = document.querySelectorAll('.error');
            check.forEach(function (element) {
                 if(element.previousElementSibling.checkValidity()){
                     element.style.display = 'none';
                 }
                 else {
                     element.style.display = 'block';
                 }
            });
        });
        checkForm.addEventListener("change", () => {
            document.getElementById('button_submit').disabled = !checkForm.checkValidity();

        });


        btn_submit.addEventListener('click',(e) => {
               e.preventDefault();
               let formData = new FormData(form);
               generateModal(formData);
           });

        const renderModalWin = (content) => {
            let modal = new ConfirmOrderModal('complete-modal');
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
            let houseNumber = formData.get('house');
            let flatNumber = formData.get('flatNumber');

            const wrapper__modal = createElement("div", 'modal_complete');
            const description = createElement('div', 'order_description');

            const name = createElement('h3', 'description_name');
            name.innerText = `Dear, ${fName} ${lName}!`;

            const description_date = createElement('h3', 'description_date');
            description_date.innerText = `Your order will be delivered on ${date}`;

            const address = createElement('h3', 'description_address');
            address.innerText = `at ${streetName} str. ${houseNumber} apt. ${flatNumber}`;

            const title = createElement('h2', 'title_complete');
            title.innerText = ' Your order is Confirmed!';

            const closeButton = createElement('btn', 'button', 'button_complete');
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
