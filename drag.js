const box = document.querySelector('.border_box');
const box_inner = document.querySelector('.border_inner');

let start = '';
let arr = [];
window.addEventListener('load', (event) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (element){
        element.addEventListener('dragstart', dragStart);
        //element.addEventListener('dragend', dragEnd);
        //event.addEventListener('drop', dragDrop)



    });

    const card_id = document.querySelectorAll('.card');
    let i = 1;
    card_id.forEach(function (element){
        element.id = i;
        i++;
    });

    box.addEventListener('drop', dragDrop);
    box.addEventListener('dragover', dragOver);


    function dragStart() {
        console.log('start');
        if(!box.classList.contains('active')){
            box.className += ' active';
        }

        start = this;


    }


    function dragOver(e) {
        e.preventDefault();
        //console.log('over');
    }


    function dragDrop() {
        let clone = start.cloneNode(true);
        let img = clone.firstChild.childNodes[0];
        let title = clone.firstChild.lastChild.childNodes[0]
        let author =  clone.firstChild.lastChild.childNodes[1]
        let price =  clone.firstChild.lastChild.childNodes[2]

        if(!box.classList.contains('drop_area')){
            box.className += ' drop_area';
        }

        box_inner.style.display = "none";
        let test = arr.some(element => element.id === clone.id);
        if(!test){
            arr.push(cartTemplate(img, title, author, price, clone.id ));
            box.append(cartTemplate(img, title, author, price, clone.id ));
        }

    }


    function cartTemplate(img, title, author, price, id) {
        const card = createElement('div', 'card');
        card.id = id;
        const card_inner = createElement('div', 'card_inner');
        const card_inner_wrapper = createElement("div", "card_inner_wrapper");
        const remove =  createElement('button', "button_remove");
        remove.id = id;
        remove.addEventListener('click',function(elem) {
            elem.target.parentElement.remove();
            arr.map(element => elem.target.id === element.id? arr.splice(arr.indexOf(element), 1):false);
        });



        card_inner.append(title, author, price);
        card_inner_wrapper.append(img, card_inner);
        card.append(card_inner_wrapper, remove);

        return card;
    }






});
