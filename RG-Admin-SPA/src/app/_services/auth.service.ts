import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:5050/api/rgapp';

@Injectable()
export class AuthService {
    isOpen = false;

    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient) { }

    loginUser(body): Observable<any> {
        return this.http.post(`${BASEURL}/login`, body);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.change.emit(this.isOpen);
    }

}
