import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
    HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    private auth: AuthenticationService;
    private router: Router;

    constructor(
        auth: AuthenticationService,
        router: Router
    ) {
        this.auth = auth;
        this.router = router;
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request).pipe(tap((event: HttpEvent<any>): any => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any): any => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.router.navigateByUrl('/');
                }
            }
        }));
    }
}
