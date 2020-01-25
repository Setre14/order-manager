import { Injectable, Component } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private snackbarDuration: number = 2000;
  private dialogWidth: string = '95%';

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  showSnackbar(message: string, action: string = ''): void {
    this.snackbar.open(message, action, {
      duration: this.snackbarDuration,
      verticalPosition: 'bottom'
    });
  }

  openDialog(component: ComponentType<unknown>) {
    this.dialog.open(component, {
      width: this.dialogWidth
    });
  }
}
