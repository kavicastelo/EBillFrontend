import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {CustomerService} from "../../../../service/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerList:any [] = [];
  selectedCustomer:any;

  customerForm = new FormGroup({
    name: new FormControl(null,[
      Validators.required
    ]),
    address: new FormControl(null,[
      Validators.required
    ]),
    salary: new FormControl(null,[
      Validators.required
    ])
  })

  constructor(private customerService:CustomerService,
              private cookieService:AuthService,
              private route:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  saveCustomer() {
    if(this.selectedCustomer){
      //update
      this.customerService.updateCustomer({
        name:this.customerForm.get('name')?.value,
        address:this.customerForm.get('address')?.value,
        salary:Number(this.customerForm.get('salary')?.value)},this.selectedCustomer._id
      ).subscribe(response=>{
        this.openSnackBar('Customer Updated!','OK');
        this.loadCustomers();
        this.clearData();
      },error => {
        console.log(error);
      })
    }
    else{
      this.customerService.saveCustomer({
        name:this.customerForm.get('name')?.value,
        address:this.customerForm.get('address')?.value,
        salary:Number(this.customerForm.get('salary')?.value)}
      ).subscribe(response=>{
        this.openSnackBar('Customer Saved!','OK');
        this.loadCustomers();
        this.clearData()
      },error => {
        console.log(error);
      })
    }
  }

  public clearData() {
    // this.customerForm.patchValue({
    //   name: null,
    //   address: null,
    //   salary: null
    // });
    this.customerForm.reset();
    this.selectedCustomer=null;
  }

  private loadCustomers(){
    this.customerService.customerList().subscribe(response=>{
      this.customerList = response.data.value;
    },error => {
      console.log(error);
    })
  }

  setUpdateData(id: any) {
    this.customerService.getCustomer(id).subscribe(response=>{
      if(response.data.value!==null){
        this.selectedCustomer = response.data.value;
        this.customerForm.patchValue({
          name: this.selectedCustomer.name,
          address: this.selectedCustomer.address,
          salary: this.selectedCustomer.salary
        });
        this.loadCustomers();
      }
      else{
        this.openSnackBar('Customer not Found!','OK');
      }
    },error=>{
      this.openSnackBar('Somethings Wrong! try again','OK');
      console.log(error);
    })
  }

  deleteCustomer(id: any) {
    if(confirm("Are you sure?")){
      this.customerService.deleteCustomer(id).subscribe(response=>{
        this.openSnackBar('Customer Deleted!','OK');
        this.loadCustomers();
      },error=>{
        this.openSnackBar('Somethings Wrong! try again','OK');
        console.log(error);
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{duration:2000});
  }

}
