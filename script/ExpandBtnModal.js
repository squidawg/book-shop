export class ExpandBtnModal {
    constructor(classes) {
        this.classes = classes;
        this.modalWrapper = '';
        this.modal = '';
        this.modalContent = '';
        this.modalCloseBtn = '';
        this.overlay = '';
        this.CloseBtnInner = '';
    }

     buildModal(content) {
        this.overlay = this.createDomNode(this.overlay, 'div', 'overlay');

        this.modalWrapper = this.createDomNode(this.modalWrapper, 'div', 'modal_wrapper');
        this.modal = this.createDomNode(this.modal, 'div', 'modal', this.classes);

        this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'button', 'modal_close');
        this.CloseBtnInner = this.createDomNode(this.modalCloseBtn, 'span', "modal__close-icon");

        this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal_content');

        this.setContent(content);

        this.appendModalElements();

        this.bindEvents();

        this.openModal();
    }

    createDomNode(node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
        }
    }

    appendModalElements() {
        this.modalCloseBtn.append(this.CloseBtnInner);
        this.modal.append(this.modalContent, this.modalCloseBtn);
        this.modalWrapper.appendChild(this.modal);
        this.overlay.appendChild(this.modalWrapper);
    }

    bindEvents() {
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
    }

    closeModal(e) {
        let classes = e.target.classList;
        if (classes.contains('overlay') || classes.contains('modal_close') || classes.contains('modal__close-icon')){
            document.querySelector('.overlay').remove();
        }
    }
}