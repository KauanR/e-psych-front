import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AttendanceComponent } from './attendance.component'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { AttendanceInfoComponent } from './a-info/a-info.component'
import { MatTabsModule } from '@angular/material/tabs'
import { AttendanceAppointmentsComponent } from './a-appointments/a-appointments.component'
import { AttendanceReportsComponent } from './a-reports/a-reports.component'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDialogModule } from '@angular/material/dialog'
import { AttendanceAddComponent } from './a-add/a-add.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

@NgModule({
    declarations: [
        AttendanceComponent,
        AttendanceInfoComponent,
        AttendanceAppointmentsComponent,
        AttendanceReportsComponent,
        AttendanceAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            component: AttendanceComponent
        }]),
        ReactiveFormsModule,

        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatButtonModule,
        MatExpansionModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class AttendanceModule { }