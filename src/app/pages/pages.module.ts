import { NgModule } from '@angular/core'
import { HomeModule } from './home/home.module'
import { LoginModule } from './login/login.module'
import { ProfileModule } from './profile/profile.module'

const pages = [
    HomeModule,
    LoginModule,
    ProfileModule
]

@NgModule({
    imports: pages,
    exports: pages
})
export class PagesModule {}