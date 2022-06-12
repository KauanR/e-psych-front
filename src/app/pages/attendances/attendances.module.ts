import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AttendancesRoutingModule } from './attendances-routing.module'
import { AttendancesComponent } from './attendances.component'

@NgModule({
    declarations: [
        AttendancesComponent
    ],
    imports: [
        CommonModule,
        AttendancesRoutingModule
    ]
})
export class AttendancesModule {}