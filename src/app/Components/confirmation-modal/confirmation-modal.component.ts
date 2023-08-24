import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() confirmationMessage: string = '';

  constructor(private activeModal: NgbActiveModal) { }

  confirmDelete() {
    this.activeModal.close('confirmed');
  }

  dismissModal() {
    this.activeModal.dismiss('dismissed');
  }
}
