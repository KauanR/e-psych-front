import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUri = environment.apiUrl

    constructor(
        private http: HttpClient
    ) {}

    private handleError(error: any): Observable<any> {
        return throwError(() => {
            console.error(error)
            return error
        })
    }

    get(url: string): Observable<any> {
        return this.http.get(`${this.apiUri}${url}`).pipe(catchError(this.handleError))
    }

    post(url: string, body: any): Observable<any> {
        return this.http.post(`${this.apiUri}${url}`, body).pipe(catchError(this.handleError))
    }

    put(url: string, body: any): Observable<any> {
        return this.http.put(`${this.apiUri}${url}`, body).pipe(catchError(this.handleError))
    }

    delete(url: string) {
        return this.http.delete(`${this.apiUri}${url}`).pipe(catchError(this.handleError))
    }

}