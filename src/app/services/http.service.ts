import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { catchError, retry } from 'rxjs/operators';
import { ProcessRequest } from '../models/process-request';
import { ProcessResponse } from '../models/process-response';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class HttpService {

    httpHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }    

    // APIMethods
    doProcess(request: ProcessRequest): Observable<string> {
        return this.http.post<string>('https://testnsapi.azurewebsites.net/api/SearchProcess', request, { headers: this.httpHeaders })
            .pipe(
                retry(2)                
            );
    }
    
    handleError(error: HttpErrorResponse){
        alert(error.message);
    }

}