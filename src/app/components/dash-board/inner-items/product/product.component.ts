import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList:any [] = [];
  selectedProduct:any;

  productForm = new FormGroup({
    description: new FormControl('',[
      Validators.required
    ]),
    quantity: new FormControl(0,[
      Validators.required
    ]),
    unitPrice: new FormControl(0,[
      Validators.required
    ])
  });

  constructor(private productService:ProductService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  saveProduct() {
    if(this.selectedProduct){
      //update
      this.productService.updateProduct({
        description:this.productForm.get('description')?.value,
        quantity:Number(this.productForm.get('quantity')?.value),
        unitPrice:Number(this.productForm.get('unitPrice')?.value)},this.selectedProduct._id
      ).subscribe(response=>{
        this.openSnackBar('Product Updated!','OK');
        this.loadProducts();
        this.clearData();
      },error => {
        console.log(error);
      })
    }
    else{
      this.productService.saveProduct(
        this.productForm.get('description')?.value,
        this.productForm.get('quantity')?.value,
        this.productForm.get('unitPrice')?.value
      ).subscribe(response=>{
        this.openSnackBar('Product Saved!','OK');
        this.loadProducts();
        this.clearData()
      },error => {
        console.log(error);
      })
    }
  }

  public clearData() {
    // this.productForm.patchValue({
    //   description: '',
    //   quantity: 0,
    //   unitPrice: 0
    // });
    this.productForm.reset({description: '',quantity: 0,unitPrice: 0});
  }

  private loadProducts(){
    this.productService.productList().subscribe(response=>{
      this.productList = response.data.value;
    },error => {
      console.log(error);
    })
  }

  setUpdateData(id: any) {
    this.productService.getProduct(id).subscribe(response=>{
      if(response.data.value!==null){
        this.selectedProduct = response.data.value;
        this.productForm.patchValue({
          description: this.selectedProduct.description,
          quantity: this.selectedProduct.quantity,
          unitPrice: this.selectedProduct.unitPrice
        });
        this.loadProducts();
        this.openSnackBar('you can update your product using above mentioned text fields','');
      }
      else{
        this.openSnackBar('Product not found!','OK');
      }
    },error=>{
      this.openSnackBar('Product Not Updated!','OK');
      console.log(error);
    })
  }

  deleteProduct(id: any) {
    if(confirm("Are you sure?")){
      this.productService.deleteProduct(id).subscribe(response=>{
        this.openSnackBar('Product Deleted!','OK');
        this.loadProducts();
      },error=>{
        this.openSnackBar('Product not deleted! try again!','OK');
        console.log(error);
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{duration:2000});
  }
}
