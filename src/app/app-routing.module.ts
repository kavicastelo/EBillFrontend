import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {DashBoardComponent} from "./components/dash-board/dash-board.component";
import {AuthGuard} from "./guards/auth.guard";
import {CustomerComponent} from "./components/dash-board/inner-items/customer/customer.component";
import {ProductComponent} from "./components/dash-board/inner-items/product/product.component";
import {OrderComponent} from "./components/dash-board/inner-items/order/order.component";
import {OrderDetailsComponent} from "./components/dash-board/inner-items/order-details/order-details.component";
import {ChartComponent} from "./components/dash-board/inner-items/chart/chart.component";

const routes: Routes = [
  {path: "",redirectTo:"/login",pathMatch:"full"},
  {path: "login",component: LoginComponent},
  {path: "signup",component: SignupComponent},
  {path: "dashboard",component: DashBoardComponent,canActivate: [AuthGuard], children: [
      {path: "", redirectTo:"/dashboard/customer", pathMatch:"full"},
      {path: "customer", component:CustomerComponent},
      {path: "product", component:ProductComponent},
      {path: "order", component:OrderComponent},
      {path: "orderdetails", component:OrderDetailsComponent},
      {path: "chart", component:ChartComponent}
    ]},
  {path: "**",component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
