import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../../app.service';
import { ConfirmComponent } from '../../modals/confirm';
import { ModalService } from '../../utils/modal.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  public confirmValue = '';

  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    private modalService: ModalService
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public confirm() {
    const modalRef = this.modalService.open(ConfirmComponent);
    modalRef.componentInstance.title = 'Confirm modal title';
    modalRef.componentInstance.message = 'Confirm modal message';
    modalRef.result.then((data): void => {
      this.confirmValue = 'confim';
    }).catch((error): void => {
      this.confirmValue = 'cancel';
    });
  }
}
