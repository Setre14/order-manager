import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor(
    public toastCtlr: ToastController
  ) {}

  async showToast(ms: string): Promise<void> {
    const toast = await this.toastCtlr.create({
      message: ms,
      duration: 2000
    });
    toast.present();
  }
}
