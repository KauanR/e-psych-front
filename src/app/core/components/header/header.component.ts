import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter, Subscription } from 'rxjs'

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    authUser: SocialUser
    authUserSub: Subscription

    currentRoute: string
    routerSub: Subscription

    constructor(
        private authService: SocialAuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authUserSub = this.authService.authState.subscribe(val => {
            this.authUser = val
        })

        this.routerSub = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(event => {
                this.currentRoute = (event as NavigationEnd).url
            })
    }

    logout(): void {
        this.authService.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch(err => console.log(err))
    }

    ngOnDestroy(): void {
        this.authUserSub?.unsubscribe()
        this.routerSub?.unsubscribe()
    }
}
