import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AttendanceComponent } from './attendance.component'

@NgModule({
    declarations: [
        AttendanceComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            component: AttendanceComponent
        }]),
        ReactiveFormsModule,
    ]
})
export class AttendanceModule {}