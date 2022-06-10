import { NgModule } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { AuthGuard } from './guards/auth.guard'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { RouterModule } from '@angular/router'
import { UserService } from './services/user.service'
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './services/api.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const exportable: any[] = [
    HeaderComponent
]

@NgModule({
    declarations: exportable,
    exports: exportable,
    imports: [
        RouterModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    providers: [
        UserService,
        ApiService,
        MatSnackBarModule,

        AuthGuard
    ]
})
export class CoreModule {}
