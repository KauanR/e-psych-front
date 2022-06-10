import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ApiService } from 'src/app/core/services/api.service'

@Component({
    selector: 'app-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

    formType: 'patient' | 'professional' = 'patient'
    form: FormGroup
    
    user: SocialUser
    userSub: Subscription

    constructor(
        private authService: SocialAuthService,
        private dialog: MatDialog,
        private router: Router,
        private formBuilder: FormBuilder,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.userSub = this.authService.authState.subscribe(val => {
            this.user = val
        })

        this.form = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            email: [{value: this.user.email, disabled: true}, Validators.required],
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
            next: data => {
                console.log(data)
            },
            error: err => {
                console.log(err)
            }
        })
    }

    cancel(): void {
        this.dialog.closeAll()
        this.authService.signOut()
        this.router.navigate(['login'])
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe()
    }
}
