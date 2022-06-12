import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component'

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProfileRoutingModule,

        NgxSkeletonLoaderModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class ProfileModule {}