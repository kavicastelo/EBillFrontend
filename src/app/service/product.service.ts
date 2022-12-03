import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../dto/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public saveProduct(description:any, qty:any, unitPrice:any): Observable<any> {
    return this.http.post(this.baseUrl + "product/save", {
      description:description,
      quantity:qty,
      unitPrice:unitPrice
    });
  }

  public updateProduct(p:Product,id:any): Observable<any> {
    return this.http.put(this.baseUrl + "product/update", {
      description:p.description,
      quantity:p.quantity,
      unitPrice:p.unitPrice
    },{headers:{id:id}});
  }

  public productList(): Observable<any> {
    return this.http.get(this.baseUrl + "product/list");
  }

  public productIdsList(): Observable<any> {
    return this.http.get(this.baseUrl + "product/id-list");
  }

  public getProduct(id:any): Observable<any> {
    return this.http.get(this.baseUrl + "product/get",{
      headers:{
        id:id
      }
    });
  }

  public deleteProduct(id:any): Observable<any> {
    return this.http.delete(this.baseUrl + "product/delete",{
      headers:{
        id:id
      }
    });
  }

  public updateQuantity(p:Product,id:any): Observable<any> {
    return this.http.put(this.baseUrl + "product/update-qty", {
      quantity:p.quantity
    },{headers:{id:id}});
  }
}
