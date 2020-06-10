import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

/* Import - DataAccess - Business */
// Import your business here

/* Import - DataAccess - Data */
// Import your data here

/* Import - Components */
// Import your components here

/* Import - Pages */
// Import your pages here
import { HomeComponent } from './pages/home';
import { NoContentComponent } from './pages/no-content';

/* Import - Pipes */
// Import your pipes here

/* Import - Modals */
import { ConfirmComponent } from './modals/confirm';

/* Import - Utils */
import { HttpInterceptorService } from './utils/http-interceptor.service';
import { AuthenticationService } from './utils/authentication.service';
import { ModalService } from './utils/modal.service';

/* Styles */
import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    /* Declarations - Components */
    /* Declarations - Modals */
    ConfirmComponent,
    /* Declarations - Pages */
    HomeComponent,
    NoContentComponent,
    /* Declarations - Pipes */
    /* End Declarations */
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    /* Providers - DataAccess - Business */
    /* Providers - DataAccess - Data */
    /* Providers - Utils */
    AuthenticationService,
    ModalService,
    /* End Providers */
  ],
  entryComponents: [
    /* EntryComponents - Modals */
    ConfirmComponent,
    /* EntryComponents - End */
  ]
})
export class AppModule {}
