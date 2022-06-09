import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter, Subscription } from 'rxjs'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    routerSub: Subscription
    currentRoute: string

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        this.routerSub = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(event => {
                this.currentRoute = (event as NavigationEnd).url
            })
    }

    ngOnDestroy(): void {
        this.routerSub?.unsubscribe()
    }

}