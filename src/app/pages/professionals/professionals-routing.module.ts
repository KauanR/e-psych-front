import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ProfessionalsComponent } from './professionals.component'

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ProfessionalsComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ProfessionalsRoutingModule {}