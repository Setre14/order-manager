import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  url = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  get<T>(api: string, action: string): Promise<T[]> {
    return this.http
      .get<T[]>(`${this.url}/${api}/${action}`).pipe(
        catchError(this.handleError<T[]>(`get ${api}/${action}`, []))
      ).toPromise();
  }

  post<T>(api: string, action: string, body: object = {}): Promise<T[]> {
    return this.http
      .post<T[]>(`${this.url}/${api}/${action}`, body).pipe(
        catchError(this.handleError<T[]>(`get ${api}/${action}`, []))
      ).toPromise();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}