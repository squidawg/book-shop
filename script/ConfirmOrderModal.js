import {ExpandBtnModal} from "./ExpandBtnModal.js";
export class ConfirmOrderModal extends ExpandBtnModal
{
    bindEvents() {}
    appendModalElements() {
        this.modal.append(this.modalContent);
        this.modalWrapper.appendChild(this.modal);
        this.overlay.appendChild(this.modalWrapper);
    }
}