import { NgModule } from '@angular/core'
import { HeaderComponent } from './components/header/header.component'
import { AuthGuard } from './guards/auth.guard'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'

const exportable: any[] = [
    HeaderComponent
]

@NgModule({
    declarations: exportable,
    exports: exportable,
    imports: [
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [
        AuthGuard
    ]
})
export class CoreModule {}
