import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  store(key: string, value: any): void {
    this.storage.set(key, value);
  }

  async hasKey(key: string): Promise<boolean> {
    let exists = false;

    const keys = await this.storage.keys();
    keys.forEach(k => {
      if (k == key) {
        exists = true;
      }
    });

    return exists;
  }

  async retrieve(key: string): Promise<any> {
    const value = await this.storage.get(key);
    return value;
  }

  removeKey(key: string): void {
    this.storage.remove(key);
  }
}
