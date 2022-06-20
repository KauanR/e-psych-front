import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfessionalsRoutingModule } from './professionals-routing.module'
import { ProfessionalsComponent } from './professionals.component'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
    declarations: [
        ProfessionalsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProfessionalsRoutingModule,

        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule
    ]
})
export class ProfessionalsModule {}