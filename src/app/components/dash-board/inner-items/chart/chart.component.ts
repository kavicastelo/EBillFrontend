import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {OrderService} from "../../../../service/order.service";
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  order:any;

  label:any[]=[];
  data:any[]=[];

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.orderList().subscribe(response=>{
      this.order = response.data.value;
      for (let i = 0; i < this.order.length; i++) {
        this.label.push(this.order[i].customer.name);
        this.data.push(this.order[i].total);
      }

      this.renderChart(this.label,this.data);

    },error => {
      console.log(error);
    })
  }

  renderChart(labeldata:any,maindata:any) {
    const myChart = new Chart("chart", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales',
          data: maindata,
          backgroundColor: "blue",
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
