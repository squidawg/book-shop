import {formData} from "./script/checkout.js";

let result = formData.get('firstName');

if(document.title === 'Complete') {
    const submit_info = document.getElementById('submit');
    submit_info.innerHTML = '';
    submit_info.append(result);
}