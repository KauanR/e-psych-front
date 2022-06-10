import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ApiService } from 'src/app/core/services/api.service'
import { UserService } from 'src/app/core/services/user.service'

@Component({
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

    formType: 'patient' | 'professional' = 'patient'
    form: FormGroup

    authUser: SocialUser
    authUserSub: Subscription

    constructor(
        private authService: SocialAuthService,
        private dialog: MatDialog,
        private router: Router,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.authUserSub = this.authService.authState.subscribe(val => {
            this.authUser = val
        })

        this.form = this.formBuilder.group({
            name: [this.authUser.name, Validators.required],
            email: [{value: this.authUser.email, disabled: true}, Validators.required],
            phone_number: [''],
            address: ['', Validators.required],
            address_number: ['', Validators.required],
            zip_code: ['', Validators.required]
        })
    }

    formTypeChange(): void {
        if(this.formType === 'patient') {
            this.form.removeControl('register_number')
            this.form.removeControl('cost_level')
            this.form.removeControl('observations')
        } else {
            this.form.addControl('register_number', new FormControl('', Validators.required))
            this.form.addControl('cost_level', new FormControl('', Validators.required))
            this.form.addControl('observations', new FormControl(''))
        }
    }

    submit(): void {
        this.apiService.post(`/${this.formType}`, this.form.getRawValue()).subscribe({
            next: () => this.userService.getUser(true),
            error: err => console.log(err)
        })
    }

    cancel(): void {
        this.dialog.closeAll()
        this.authService.signOut()
        this.router.navigate(['login'])
    }

    ngOnDestroy(): void {
        this.authUserSub?.unsubscribe()
    }
}
