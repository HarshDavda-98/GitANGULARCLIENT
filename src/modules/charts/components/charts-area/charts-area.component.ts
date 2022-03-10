import { HttpErrorResponse } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {
    // AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '@app/shared/api.service';
import { Subscription } from 'rxjs';
// import { Chart } from 'chart.js';
import { FormMOdels } from './charts.modal';

@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit {
    // subscribe!:Subscription;

    valuetoedit: any;
    formvalue!: FormGroup;
    FormCrud: FormMOdels = new FormMOdels();
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    constructor(private formbuilder: FormBuilder, private Api: ApiService) { }
    ngOnInit() {
        this.formvalue = this.formbuilder.group({ Name: [""], Email: [""], Phone: [] })
        this.Api.Subject_list.subscribe((data) => {
            this.valuetoedit = data;
            setTimeout(() => {
                this.Edit();
            }, 3000);
            // return data
        });
    }
    Edit() {
        this.formvalue.controls['Name'].setValue("Harsh")
        // console.log(this.valuetoedit.Email)
        // this.formvalue.controls['Phone'].setValue(this.valuetoedit.Phone);
        // this.FormCrud._id = this.valuetoedit._id;
        console.log("Form input")
    }
    // ngOnDestroy(){
    //     this.subscribe.unsubscribe();
    // }
    
    postCrudData_to_API() {
        this.FormCrud.Name = this.formvalue.value.Name;
        this.FormCrud.Email = this.formvalue.value.Email;
        this.FormCrud.Phone = this.formvalue.value.Phone;
        this.Api.postCrudData(this.FormCrud).subscribe(
            (res) => {
                this.formvalue.reset();
                let status = res.Msg;
                alert(status)
                //   this.router.navigate(['/dashboard'])
            },
            (err: HttpErrorResponse) => {
                let error = err.error.Msg;
                alert(error)
            }
        );
    }
   
}
