import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AttendancesComponent } from './attendances.component'

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AttendancesComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AttendancesRoutingModule {}