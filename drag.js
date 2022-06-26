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
        box.className += ' active';
        start = this;


    }


    function dragOver(e) {
        e.preventDefault();
        //console.log('over');
    }


    function dragDrop() {
        let clone = start.cloneNode(true);

        box.className += ' drop_area';
        box_inner.style.display = "none";
        let test = arr.some(element => element.id === clone.id)
        if(!test){
            arr.push(clone)
            box.append(clone);
        }











    }

    function cartCard(img, title, author, price){
    }



});
