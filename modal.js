class Modal {
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
        this.CloseBtnInner.innerHTML ='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003V6.00003Z" fill="#292929"/>\n' +
            '</svg>'


        this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal_content');

        this.setContent(content);

        this.appendModalElements();

        this.bindEvents();

        this.openModal();
    }


    createDomNode(node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes)
        return node
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
        this.modalCloseBtn.append(this.CloseBtnInner)
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
        if (classes.contains('overlay') || classes.contains('modal_close')) {
            document.querySelector('.overlay').remove();
        }


    }
}