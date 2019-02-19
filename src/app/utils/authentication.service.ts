import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/loginResponse';

@Injectable()
export class AuthenticationService {

    constructor(
        //
    ) {
        //
    }

    public isLogged(): boolean {
        const token = localStorage.getItem('token');
        const logged = token !== null && token !== undefined;
        return logged;
    }

    public clear(): void {
        localStorage.clear();
    }

    public set(token: string): void {
        localStorage.setItem('token', JSON.stringify(token));
    }

    public getToken(): string {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined) {
            return JSON.parse(token);
        }
        return undefined;
    }
}
