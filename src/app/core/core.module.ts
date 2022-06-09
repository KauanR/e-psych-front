import { NgModule } from '@angular/core'

const exportable: any[] = [

]

@NgModule({
    declarations: exportable,
    exports: exportable,
    imports: [],
    providers: []
})
export class CoreModule {}
