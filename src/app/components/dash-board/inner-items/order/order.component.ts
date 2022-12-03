import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../../service/customer.service";
import {ProductService} from "../../../../service/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  customerIdsList: any[] = [];
  productIdsList: any[] = [];

  selectedCustomer: any;
  selectedProduct: any;

  cart: any[] = [];

  customerForm = new FormGroup({
    id: new FormControl(null, [
      Validators.required
    ]),
    name: new FormControl(null, [
      Validators.required
    ]),
    address: new FormControl(null, [
      Validators.required
    ]),
    salary: new FormControl(null, [
      Validators.required
    ])
  })
  productForm = new FormGroup({
    id: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    quantity: new FormControl(0, [
      Validators.required
    ]),
    unitPrice: new FormControl(0, [
      Validators.required
    ]),
    qty: new FormControl(0, [
      Validators.required
    ])
  });

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getAllCustomerIds();
    this.getAllProductIds();
  }

  getAllCustomerIds() {
    this.customerService.customerIdsList().subscribe(response => {
      this.customerIdsList = response.data.value;
    }, error => {
      console.log(error);
    })
  }

  getAllProductIds() {
    this.productService.productIdsList().subscribe(response => {
      this.productIdsList = response.data.value;
    }, error => {
      console.log(error);
    })
  }

  setCustomerId() {
    this.customerService.getCustomer(this.customerForm.get('id')?.value).subscribe(response => {
      if (response.data.value !== null) {
        this.selectedCustomer = response.data.value;
        this.customerForm.patchValue({
          name: this.selectedCustomer.name,
          address: this.selectedCustomer.address,
          salary: this.selectedCustomer.salary
        });
      } else {
        alert("User Not Found!")
      }
    }, error => {
      console.log(error);
    })
  }

  setProductId() {
    this.productService.getProduct(this.productForm.get('id')?.value).subscribe(response => {
      if (response.data.value !== null) {
        this.selectedProduct = response.data.value;
        this.productForm.patchValue({
          description: this.selectedProduct.description,
          quantity: this.selectedProduct.quantity,
          unitPrice: this.selectedProduct.unitPrice
        });
      } else {
        alert("User Not Found!")
      }
    }, error => {
      console.log(error);
    })
  }

  addToCart() {

    let unitPrice = Number(this.productForm.get('unitPrice')?.value);
    let qty = Number(this.productForm.get('qty')?.value);
    let total = unitPrice * qty;

    if (this.selectedProduct.quantity >= Number(this.productForm.get('qty')?.value)) {
      if (this.isExists(this.selectedProduct._id)) {
        //update
        for (let t of this.cart) {
          if (t.item._id === this.selectedProduct._id) {
            t.qty = (t.qty + qty);
            t.total = (t.total + total);
          }
        }
        this.updateSelectedProduct();
      } else {
        this.cart.push({
          unitPrice: unitPrice,
          qty: qty,
          total: total,
          item: this.selectedProduct
        })
        this.updateSelectedProduct();
      }
    } else {
      alert(`we have only ${this.selectedProduct.quantity} ${this.selectedProduct.description} items!`);
    }

  }

  isExists(id: string) {
    for (let t of this.cart) {
      if (t.item._id === id) {
        return true;
      }
    }
    return false;
  }

  delete(id: any) {

    if (confirm('Are you sure?')) {
      for (let i = 0; i < this.cart.length; i++) {

        let qty = Number(this.cart[i].qty);
        let qtyOnHand = Number(this.selectedProduct.quantity);
        let newQty = qtyOnHand;

        if (this.productForm.get('id')?.value === null) {
          newQty = qtyOnHand;
        } else {
          newQty = qtyOnHand + qty;
        }

        if (id === this.cart[i].item._id) {

          this.productService.updateQuantity({
              description: this.productForm.get('description')?.value,
              quantity: Number(newQty),
              unitPrice: Number(this.productForm.get('unitPrice')?.value)
            }, this.cart[i].item._id
          ).subscribe(response => {
            this.openSnackBar('Removed Item from cart!','OK');
            this.productForm.reset();
          }, error => {
            console.log(error);
          })

          this.cart.splice(i, 1);
          return;
        }
      }
    }
  }

  saveOrder() {

    let total = 0;
    this.cart.forEach(e => {
      total += e.total
    })
    this.orderService.saveOrder(
      this.selectedCustomer,
      this.cart,
      total,
      new Date()
    ).subscribe(response => {
      this.openSnackBar('Purchased!','');
      this.cart = [];
    }, error => {
      this.openSnackBar('Somethings wrong! try again','OK');
      console.log(error);
    })
  }

  updateSelectedProduct() {

    let qty = Number(this.productForm.get('qty')?.value);
    let qtyOnHand = Number(this.selectedProduct.quantity);
    let newQty = qtyOnHand - qty;

    this.productService.updateQuantity({
        description: this.productForm.get('description')?.value,
        quantity: Number(newQty),
        unitPrice: Number(this.productForm.get('unitPrice')?.value)
      }, this.selectedProduct._id
    ).subscribe(response => {
      this.openSnackBar('Added to Cart!','');
      this.productForm.reset();
      this.customerForm.reset();
    }, error => {
      this.openSnackBar('Somethings wrong! try again','OK');
      console.log(error);
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{duration:2000});
  }

}
