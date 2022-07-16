import {Modal} from "./modal.js";
export class NewModal extends Modal
{
    closeModal() {}
    bindEvents() {}
    appendModalElements() {
        this.modalCloseBtn.append(this.CloseBtnInner);
        this.modal.append(this.modalContent);
        this.modalWrapper.appendChild(this.modal);
        this.overlay.appendChild(this.modalWrapper);
    }
}