import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DBElem, RestAPI, RestAction } from '../../../../shared';
import { UtilService } from './util.service';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private SERVER_URL_KEY = 'serverUrl';
  private DEFAULT_URL = 'https://om-server.setre14.com';

  private url: string = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private storageService: StorageService,
    private utilService: UtilService
  ) {}

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
    this.storageService.store(this.SERVER_URL_KEY, this.url);
  }

  resetUrl(): void {
    this.url = this.DEFAULT_URL;
    this.storageService.store(this.SERVER_URL_KEY, this.url);
  }

  async getFiltered<T extends DBElem>(
    api: RestAPI,
    filter: object,
    conversion: (elem: DBElem) => T
  ) {
    const res = await this.post<T>(api, RestAction.GET, filter);

    return this.convertAndMap(res, conversion);
  }

  async getAll<T extends DBElem>(
    api: RestAPI,
    conversion: (elem: DBElem) => T
  ): Promise<Map<string, T>> {
    const res = await this.get<T>(api, RestAction.ALL);

    return this.convertAndMap(res, conversion);
  }

  async insert(api: RestAPI, elem: DBElem): Promise<void> {
    await this.post(api, RestAction.INSERT, elem);
  }

  async update(api: RestAPI, elem: DBElem): Promise<void> {
    await this.post(api, RestAction.INSERT_OR_UPDATE, elem);
  }

  async disable(api: RestAPI, filter: object): Promise<void> {
    await this.post(api, RestAction.DISABLE, filter);
  }

  async disableAll(api: RestAPI): Promise<void> {
    await this.get(api, RestAction.DISABLE_ALL);
  }

  convertAndMap<T extends DBElem>(
    array: T[],
    conversion: (elem: DBElem) => T
  ): Map<string, T> {
    const dbElems = new Map<string, T>();
    array.forEach(elem => {
      const e: T = conversion(elem);

      dbElems.set(e._id, e);
    });

    return dbElems;
  }

  async get<T extends DBElem>(api: string, action: string): Promise<T[]> {
    const url = await this.getUrl();

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
    const url = await this.getUrl();

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
        this.utilService.showToast(
          `Server ${this.url} kann nicht erreicht werden. \nBitte setze die Server URL in den Einstellungen.`
        );

        this.navCtrl.navigateRoot(['/settings']);
      }

      return of(result as T);
    };
  }
}
