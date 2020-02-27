import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private toastCtrl: ToastController) {}

  async showToast(ms: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: ms,
      duration: 2000,
    });
    toast.present();
  }
}
