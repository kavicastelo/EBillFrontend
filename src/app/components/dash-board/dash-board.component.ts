import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    private route: Router,
    private cookieService: AuthService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  public logout(){
    this.cookieService.logout();
    this.route.navigateByUrl('/login');
    this.openSnackBar('Logged out','');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{duration:2000});
  }

}
