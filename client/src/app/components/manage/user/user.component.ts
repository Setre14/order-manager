import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../../../shared';
import { ModalController } from '@ionic/angular';
import { ManageAddUserComponent } from '../add/add-user/add-user.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../style.scss'],
})
export class ManageUserComponent implements OnInit {
  expandedUser: string;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.userService.load();
  }

  expand(user: User): void {
    this.expandedUser = this.expandedUser == user._id ? '' : user._id;
  }

  isExpanded(user: User): boolean {
    return this.expandedUser == user._id;
  }


  getUsers(): User[] {
    return this.userService.getUsers();
  }

  disable(user): void {
    this.userService.disable(user._id);
  }
}
