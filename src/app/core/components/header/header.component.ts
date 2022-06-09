import { SocialAuthService } from '@abacritt/angularx-social-login'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {

    constructor(
        private authService: SocialAuthService,
        private router: Router
    ) {}

    logout(): void {
        this.authService.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch(err => console.log(err))
    }

}
