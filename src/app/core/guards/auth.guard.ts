import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { map, Observable, tap } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: SocialAuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.authState.pipe(
            map((socialUser: SocialUser) => !!socialUser),
            tap((isLoggedIn: boolean) => {
                if (!isLoggedIn) 
                    this.router.navigate(['login']);
            })
        )
    }
}