import { NgModule } from '@angular/core'
import { HomeModule } from './home/home.module'
import { LoginModule } from './login/login.module'

const pages = [
    HomeModule,
    LoginModule
]

@NgModule({
    imports: pages,
    exports: pages
})
export class PagesModule {}