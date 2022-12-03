import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DashBoardComponent} from './components/dash-board/dash-board.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CustomerComponent} from './components/dash-board/inner-items/customer/customer.component';
import {ProductComponent} from './components/dash-board/inner-items/product/product.component';
import {OrderComponent} from './components/dash-board/inner-items/order/order.component';
import {OrderDetailsComponent} from './components/dash-board/inner-items/order-details/order-details.component';
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {ChartComponent} from './components/dash-board/inner-items/chart/chart.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

// import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    DashBoardComponent,
    CustomerComponent,
    ProductComponent,
    OrderComponent,
    OrderDetailsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    // ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
