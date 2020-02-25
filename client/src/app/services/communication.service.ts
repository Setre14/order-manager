import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DBElem } from '../../../../shared';
import { UtilService } from './util.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private SERVER_URL_KEY = 'serverUrl'
  private DEFAULT_URL = 'https://om-server.setre14.com';

  private url: string = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private utilService: UtilService
  ) { }

  async getUrl(): Promise<string> {
    if (!this.url) {
      this.url = await this.storageService.retrieve(this.SERVER_URL_KEY);
      if (!this.url) {
        this.url = this.DEFAULT_URL;
      }
    }

    return this.url;
  }

  setUrl(url: string): void {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    this.url = url;
    this.storageService.store(this.SERVER_URL_KEY, this.url)
  }

  resetUrl(): void {
    this.url = this.DEFAULT_URL;
    this.storageService.store(this.SERVER_URL_KEY, this.url)
  }

  async get<T extends DBElem>(api: string, action: string): Promise<T[]> {
    const url = await this.getUrl()

    const header = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return await this.http
      .get<T[]>(`${url}/${api}/${action}`, header)
      .pipe(catchError(this.handleError<T[]>(`get ${api}/${action}`, [])))
      .toPromise();
  }

  async post<T extends DBElem>(
    api: string,
    action: string,
    body: object = {}
  ): Promise<T[]> {
    const url = await this.getUrl()
    
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return await this.http
      .post<T[]>(`${url}/${api}/${action}`, body, header)
      .pipe(catchError(this.handleError<T[]>(`get ${api}/${action}`, [])))
      .toPromise();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 0) {
        this.utilService.showToast(`Cant reach Server ${this.url}. \nPlease set Server Url in Settings.`)
      }

      return of(result as T);
    };
  }
}
