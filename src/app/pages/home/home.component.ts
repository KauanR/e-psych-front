import { Component, OnDestroy, OnInit } from '@angular/core'
import { filter, Subscription } from 'rxjs'
import { User } from 'src/app/core/interfaces/user'
import { UserService } from 'src/app/core/services/user.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    user: User
    userSub: Subscription

    constructor(
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userSub = this.userService.user
            .pipe(filter(user => user.id !== ''))
            .subscribe(user => {
                this.user = user
            })
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe()
    }

}
