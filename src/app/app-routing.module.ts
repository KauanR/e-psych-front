import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(mod => mod.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
