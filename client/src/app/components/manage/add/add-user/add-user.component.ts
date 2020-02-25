import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Role, User, RestAPI, RestAction } from '../../../../../../../shared';
import { CommunicationService } from 'src/app/services/communication.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddUserComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private utilService: UtilService
  ) { }

  ngOnInit() {}

  getRoles(): string[] {
    // Object.keys(MyEnum);
    return Object.values(Role);
  }

  add(u: any): void {
    const user = User.create(u);

    this.userService.add(user);
    this.utilService.showToast(`Added User "${user.username}" as "${user.role}"`);
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
