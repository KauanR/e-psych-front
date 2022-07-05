import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-attendance-reports',
    templateUrl: 'a-reports.component.html',
    styleUrls: ['a-reports.component.scss']
})
export class AttendanceReportsComponent {

    @Input() reports: any[]

}