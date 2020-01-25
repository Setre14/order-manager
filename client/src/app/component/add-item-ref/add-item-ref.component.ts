import { Component, OnInit } from '@angular/core';
import { RestAPI, RestAction, Item } from '../../../../../shared';
import { CommunicationService } from 'src/app/service/communication.service';
import { ItemService } from 'src/app/service/item.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-add-item-ref',
  templateUrl: './add-item-ref.component.html',
  styleUrls: ['./add-item-ref.component.scss']
})
export class AddItemRefComponent implements OnInit {
  typeForm: FormGroup;
  itemForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private typeService: TypeService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddItemRefComponent>
  ) { 
    this.typeForm = this.formBuilder.group({
      type: ''
    });
    this.itemForm = this.formBuilder.group({
      name: '',
      price: 0,
      type: ''
    });
  }

  ngOnInit() {
    this.typeService.loadTypes();
  }

  getTypes(): string[] {
    return this.typeService.getTypes();
  }

  onSubmitType(type: any) {
    this.typeService.addType(type.type)
  }

  onSubmitItem(itemData: Item) {
    if (itemData.type === '') {
      return;
    }

    itemData.name = itemData.name.trim();

    this.itemService.getItems().forEach(item => {
      if (item.name === itemData.name) {
        this.snackBar.open('Item ' + itemData.name + ' already exists', '', {
          duration: 2 * 1000,
          verticalPosition: 'top'
        });
        return;
      }
    });

    this.itemService.addItem(itemData);

    this.itemForm.reset({
      name: '',
      price: 0,
      type: itemData.type
    });
  }

  close(): void {
    this.dialogRef.close()
  }
}
