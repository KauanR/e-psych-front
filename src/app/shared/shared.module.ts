import { NgModule } from '@angular/core'
import { RegistrationModule } from './registration/registration.module'

const exportable = [
    RegistrationModule
]

@NgModule({
    imports: exportable,
    exports: exportable
})
export class SharedModule {}