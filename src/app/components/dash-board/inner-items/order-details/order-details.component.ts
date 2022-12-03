import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../../service/customer.service";
import {ProductService} from "../../../../service/product.service";
import {OrderService} from "../../../../service/order.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderIdsList: any[] = [];
  itemsList: any[]=[];

  selectedOrder: any;

  ordersForm = new FormGroup({
    date: new FormControl(null, [
      Validators.required
    ]),
    c_id: new FormControl(null, [
      Validators.required
    ]),
    c_name: new FormControl(null, [
      Validators.required
    ]),
    c_address: new FormControl(null, [
      Validators.required
    ]),
    item: new FormControl(null, [
      Validators.required
    ]),
    price: new FormControl(null, [
      Validators.required
    ]),
    total: new FormControl(null)
  })

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getAllOrderIds();
  }

  setOrderData(id: any) {

    this.orderService.getOrder(id).subscribe(response => {
      if (response.data.value !== null) {
        this.selectedOrder = response.data.value;
        this.ordersForm.patchValue({
          c_id: this.selectedOrder.customer._id,
          c_name: this.selectedOrder.customer.name,
          c_address: this.selectedOrder.customer.address,
          total: this.selectedOrder.total
        });

        this.itemsList = response.data.value.items;

      } else {
        alert("Product Not Found!")
      }
    }, error => {
      console.log(error);
    })
  }

  getAllOrderIds() {
    this.orderService.orderIdsList().subscribe(response => {
      this.orderIdsList = response.data.value;
    }, error => {
      console.log(error);
    })
  }

}
