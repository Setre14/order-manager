import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  url = 'https://om-server.setre14.com';

  constructor(private http: HttpClient) { }

  get<T>(api: string, action: string): Promise<T[]> {
    const header = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http
      .get<T[]>(`${this.url}/${api}/${action}`, header).pipe(
        catchError(this.handleError<T[]>(`get ${api}/${action}`, []))
      ).toPromise();
  }

  post<T>(api: string, action: string, body: object = {}): Promise<T[]> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http
      .post<T[]>(`${this.url}/${api}/${action}`, body, header).pipe(
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
