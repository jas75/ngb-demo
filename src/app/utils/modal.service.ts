import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

    private ngbModal: NgbModal;

    constructor(
        ngbModal: NgbModal
    ) {
        this.ngbModal = ngbModal;
    }

    public open(content, options = {}) {
        return this.ngbModal.open(content, { backdrop: 'static', centered: true, ...options });
    }
}
