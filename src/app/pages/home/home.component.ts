import { SocialAuthService } from '@abacritt/angularx-social-login'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: SocialAuthService
    ) {}

    ngOnInit(): void {
        this.authService.authState.subscribe(val => {
            console.log('AuthState', val)
        })
    }

}
