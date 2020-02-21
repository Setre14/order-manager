import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {}

  store(key: string, value: any): void {
    this.storage.set(key, value);
  }

  async retrieve(key: string): Promise<any> {
    const value = await this.storage.get(key)
    return value;
  }

  removeKey(key: string): void {
    this.storage.remove(key);
  }

  async showToast(ms: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: ms,
      duration: 2000,
    });
    toast.present();
  }
}
