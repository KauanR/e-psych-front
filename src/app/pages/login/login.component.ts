import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup

    constructor(
        private authService: SocialAuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        })
    }

    login(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(() => {
                this.router.navigate(['/home'])
            })
            .catch(err => {
                console.log(err)
            })
    }

    formSubmit(): void {
        console.log(this.loginForm.value)
    }
}