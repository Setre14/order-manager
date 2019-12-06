import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderCommentService {
  manual = 'sontiges';
  default = 'ohne Pommes';

  comments: string[] = [
    'ohne Ketchup',
    'ohne Fleisch'
  ];


  constructor() { }

  isManual(comment: string): boolean {
    return comment === this.manual;
  }

  getComments(): string[] {
    return [this.default, ...this.comments, this.manual];
  }

  getDefaultComment() {
    return this.default;
  }
}
