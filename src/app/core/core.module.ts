import { NgModule } from '@angular/core'
import { AuthGuard } from './guards/auth.guard'

const exportable: any[] = [

]

@NgModule({
    declarations: exportable,
    exports: exportable,
    imports: [],
    providers: [
        AuthGuard
    ]
})
export class CoreModule {}
