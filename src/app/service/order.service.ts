import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public saveOrder(customer:any, items:any[], total:any, date:any): Observable<any> {
    return this.http.post(this.baseUrl + "order/save", {
      customer:customer,
      items:items,
      total:total,
      date:date
    });
  }

  public orderIdsList(): Observable<any> {
    return this.http.get(this.baseUrl + "order/id-list");
  }

  public getOrder(id:any): Observable<any> {
    return this.http.get(this.baseUrl + "order/get",{
      headers:{
        id:id
      }
    });
  }

  public orderList(): Observable<any> {
    return this.http.get(this.baseUrl + "order/list");
  }

}
