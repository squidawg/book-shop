window.addEventListener('load', () => {
    const delivery_info = document.querySelector('.cart_container');
    const gift = document.querySelector('.gift')
    gift.addEventListener('click' ,function (){
        let checks = document.querySelectorAll('input[type=checkbox]:checked')
        let checked = document.querySelectorAll('input[type=checkbox]');
        checked.forEach(function (element){
            if(checks.length === 2 && element.checked === false) {
                element.disabled = true
                element.required = true
            }
            else if (checks.length < 2){
                element.disabled = false
            }

        });
    })
    delivery_info.append(info);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    document.getElementById('input-date').setAttribute('min', tomorrow.toISOString().split('T')[0]);



    const checkForm = document.getElementById('delivery');
    checkForm.addEventListener("change",() => {
        document.getElementById('button_submit').disabled = !checkForm.checkValidity()
    });
});

