import { NgModule } from '@angular/core'
import { AttendancesModule } from './attendances/attendances.module'
import { HomeModule } from './home/home.module'
import { LoginModule } from './login/login.module'
import { ProfessionalsModule } from './professionals/professionals.module'
import { ProfileModule } from './profile/profile.module'

const pages = [
    AttendancesModule,
    HomeModule,
    LoginModule,
    ProfessionalsModule,
    ProfileModule
]

@NgModule({
    imports: pages,
    exports: pages
})
export class PagesModule {}