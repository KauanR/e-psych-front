import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {

    constructor(
        private authService: SocialAuthService,
        private router: Router
    ) {}

    login(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(() => {
                this.router.navigate(['/home'])
            })
            .catch(err => {
                console.log(err)
            })
    }
}