import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../dto/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public saveCustomer(c:Customer): Observable<any> {
    return this.http.post(this.baseUrl + "customer/save", {
      name:c.name,
      address:c.address,
      salary:c.salary
    });
  }

  public updateCustomer(c:Customer,id:any): Observable<any> {
    return this.http.put(this.baseUrl + "customer/update", {
      name:c.name,
      address:c.address,
      salary:c.salary
    },{headers:{id:id}});
  }

  public customerList(): Observable<any> {
    return this.http.get(this.baseUrl + "customer/list");
  }

  public getCustomer(id:any): Observable<any> {
    return this.http.get(this.baseUrl + "customer/get",{
      headers:{
        id:id
      }
    });
  }

  public deleteCustomer(id:any): Observable<any> {
    return this.http.delete(this.baseUrl + "customer/delete",{
      headers:{
        id:id
      }
    });
  }

  public customerIdsList(): Observable<any> {
    return this.http.get(this.baseUrl + "customer/id-list");
  }

}
