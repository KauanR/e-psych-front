import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-attendance-appointments',
    templateUrl: 'a-appointments.component.html',
    styleUrls: ['a-appointments.component.scss']
})
export class AttendanceAppointmentsComponent {

    @Input() appointments: any[]

}