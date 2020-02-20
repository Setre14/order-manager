import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DBElem, Table } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private url = 'http://localhost:3001';
  // private url = 'https://om-server.setre14.com';

  constructor(private http: HttpClient) { }

  getUrl(): string {
    return this.url;
  }

  setUrl(url: string): void {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    this.url = url;
  }

  async get<T extends DBElem>(api: string, action: string): Promise<T[]> {
    const header = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    return await this.http
      .get<T[]>(`${this.url}/${api}/${action}`, header).pipe(
        catchError(this.handleError<T[]>(`get ${api}/${action}`, []))
      ).toPromise();
  }

  async post<T extends DBElem>(api: string, action: string, body: object = {}): Promise<T[]> {
    const header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return await this.http
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
