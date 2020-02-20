import { Injectable, Component } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private snackbarDuration: number = 2000;
  private dialogWidth: string = '95%';

  constructor(
    // private snackbar: MatSnackBar,
    public modalController: ModalController
  ) {}

  // showSnackbar(message: string, action: string = ''): void {
  //   this.snackbar.open(message, action, {
  //     duration: this.snackbarDuration,
  //     verticalPosition: 'bottom'
  //   });
  // }
}
