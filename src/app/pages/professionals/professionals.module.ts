import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfessionalsRoutingModule } from './professionals-routing.module'
import { ProfessionalsComponent } from './professionals.component'

@NgModule({
    declarations: [
        ProfessionalsComponent
    ],
    imports: [
        CommonModule,
        ProfessionalsRoutingModule
    ]
})
export class ProfessionalsModule {}