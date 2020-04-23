import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Role, User } from '../../../../../../../shared';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getRoles(): string[] {
    // Object.keys(MyEnum);
    return Object.values(Role);
  }

  isUserDefined(): boolean {
    return this.userForm.valid;
  }

  add(): void {
    if (!this.isUserDefined()) {
      return;
    }

    console.log(this.userForm.value);

    const user = User.create(this.userForm.value);

    console.log(user);

    this.userService.add(user);
    this.utilService.showToast(
      `User "${user.username}" als "${user.role}" hinzugefügt`
    );
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
