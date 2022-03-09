import { HttpErrorResponse } from '@angular/common/http';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '@app/shared/api.service';
import { Chart } from 'chart.js';
import { FormMOdels } from './charts.modal';

@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    formvalue!:FormGroup;
    FormCrud:FormMOdels = new FormMOdels();
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    constructor( private formbuilder : FormBuilder, private Api:ApiService) {}
    ngOnInit() {
        this.formvalue = this.formbuilder.group({
            Name:[""],
            Email:[""],
            Phone:[],
        })
    }
    postCrudData_to_API(){
        this.FormCrud.Name=this.formvalue.value.Name;
        this.FormCrud.Email=this.formvalue.value.Email;
        this.FormCrud.Phone=this.formvalue.value.Phone;
        this.Api.postCrudData(this.FormCrud).subscribe(
            (res) => {
              this.formvalue.reset();
              let status = res.Msg;
              alert(status)
            //   this.router.navigate(['/dashboard'])
            },
            (err:HttpErrorResponse)=>{
              let error = err.error.Msg;
              alert(error)
              }
          );
    }


    ngAfterViewInit() {
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: [
                    'Mar 1',
                    'Mar 2',
                    'Mar 3',
                    'Mar 4',
                    'Mar 5',
                    'Mar 6',
                    'Mar 7',
                    'Mar 8',
                    'Mar 9',
                    'Mar 10',
                    'Mar 11',
                    'Mar 12',
                    'Mar 13',
                ],
                datasets: [
                    {
                        label: 'Sessions',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(2,117,216,0.2)',
                        borderColor: 'rgba(2,117,216,1)',
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(2,117,216,1)',
                        pointBorderColor: 'rgba(255,255,255,0.8)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            10000,
                            30162,
                            26263,
                            18394,
                            18287,
                            28682,
                            31274,
                            33259,
                            25849,
                            24159,
                            32651,
                            31984,
                            38451,
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'day',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 40000,
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, .125)',
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }
}
