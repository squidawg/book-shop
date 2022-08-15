import createElement from "./CreateElement.js";
import {ConfirmOrderModal} from "./ConfirmOrderModal.js";

let form = document.querySelector('form');
const btn_submit = document.querySelector('.button_submit');
const payment_wrapper = document.querySelector('.payment_wrapper');
const checkbox = document.querySelector('.gift');
const cart_container = document.querySelector('.cart_container');
const cart_total = document.querySelector('.cart_total');
//executes only if checkout.html is loaded
//
if(document.title === 'Checkout') {
    let data = JSON.parse(sessionStorage.getItem('test'));
    let total = sessionStorage.getItem('total');
    window.addEventListener('load', () => {

        const total_text = createElement('h4', 'total_text');
        //checkout-form parsing data obj to set items which will be bought
        //
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
        // checkout-form total price
        //
        total_text.innerHTML = `Total: $${total}`;
        cart_total.append(total_text);
        //checkout-form checkbox function allows only 2 optional choose from given 4.
        //
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
        //checkout-form change date format from datepicker
        //
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        document.getElementById('input-date').setAttribute('min',
            tomorrow.toISOString().split('T')[0]);
        // event listener for "invalid input" message
        //
        const checkForm = document.getElementById('delivery');
        checkForm.addEventListener('change', ()=>{
            const check = document.querySelectorAll('.error');
            check.forEach(function (element) {
                 if(element.previousElementSibling.checkValidity()){
                     element.style.visibility = 'hidden';
                 }
                 else {
                     element.style.visibility = 'initial';
                 }
            });
        });
        //check if all required fields are filled properly
        checkForm.addEventListener("change", () => {
            document.getElementById('button_submit').disabled = !checkForm.checkValidity();
        });
        // pass valid form input  to generate  modal
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
