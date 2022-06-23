import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfessionalsRoutingModule } from './professionals-routing.module'
import { ProfessionalsComponent } from './professionals.component'
import { ProfessionalsDetailsComponent } from './p-details/p-details.component'
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatRippleModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    declarations: [
        ProfessionalsComponent,
        ProfessionalsDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProfessionalsRoutingModule,

        MatCardModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatRippleModule,
        MatDialogModule,
        MatTabsModule,
        MatButtonModule,
        NgxSkeletonLoaderModule
    ]
})
export class ProfessionalsModule {}