import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { HomeComponent } from './pages/home';
import { NoContentComponent } from './pages/no-content';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* DataAccess - Business */
// Import your business here

/* DataAccess - Data */
// Import your data here

/* Components */
// Import your components here

/* Pages */
// Import your pages here

/* Pipes */
// Import your pipes here

/* Modals */
import { ConfirmComponent } from './modals/confirm';

/* Utils */
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
    /* Modals */
    ConfirmComponent,
    /* Pages */
    HomeComponent,
    NoContentComponent,
    /* Pipes */
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
    NgbModule.forRoot(),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    /* DataAccess - Business */
    /* DataAccess - Data */
    /* Utils */
    AuthenticationService,
    ModalService,
  ],
  entryComponents: [
    /* Modals */
    ConfirmComponent,
  ]
})
export class AppModule {}
