import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../service/item.service';
import {OrderService} from '../../service/order.service';
import {LangService} from '../../service/lang.service';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  table: string;
  sub: any;

  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    private router: Router,
    public itemService: ItemService,
    public orderService: OrderService,
    public commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
    });
    this.itemService.loadItems();
    this.commentService.load();
    this.orderService.resetActiveOrder();

    this.langService.setTableTitle(this.table, 'Order')
  }

  getTypes(): string[] {
    return this.itemService.getTypes();
  }

  total(): number {
    return this.orderService.getActiveOrderTotal();
  }

  async addOrder() {
    await this.orderService.addActiveOrder();
    
    this.router.navigate(['/table', this.table]);
  }
}
