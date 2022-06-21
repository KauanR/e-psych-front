import { SocialAuthService } from '@abacritt/angularx-social-login'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter, Subscription } from 'rxjs'
import { UserService } from '../../services/user.service'

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    userPhotoUrl: string
    userSub: Subscription

    currentRoute: string
    routerSub: Subscription

    constructor(
        private authService: SocialAuthService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userSub = this.userService.user.subscribe(val => {
            this.userPhotoUrl = val.attributes.photoUrl
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
        this.routerSub?.unsubscribe()
    }
}
