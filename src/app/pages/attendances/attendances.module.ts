import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AttendancesRoutingModule } from './attendances-routing.module'
import { AttendancesComponent } from './attendances.component'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
    declarations: [
        AttendancesComponent
    ],
    imports: [
        CommonModule,
        AttendancesRoutingModule,
        FormsModule,
        ReactiveFormsModule,

        MatCardModule,
        MatIconModule,
        MatCheckboxModule,
        MatDividerModule
    ]
})
export class AttendancesModule {}