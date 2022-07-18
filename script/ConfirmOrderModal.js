import {ExpandBtnModal} from "./ExpandBtnModal.js";
export class ConfirmOrderModal extends ExpandBtnModal
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