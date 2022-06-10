import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { RegistrationComponent } from './registration.component'

import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'

const exportable = [
    RegistrationComponent
]

@NgModule({
    declarations: exportable,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatDividerModule
    ],
    exports: exportable
})
export class RegistrationModule {}