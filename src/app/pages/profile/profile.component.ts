import { SocialAuthService } from '@abacritt/angularx-social-login'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { debounceTime, filter, Subscription, take } from 'rxjs'
import { User } from 'src/app/core/interfaces/user'
import { ApiService } from 'src/app/core/services/api.service'
import { SnackbarService } from 'src/app/core/services/snackbar.service'
import { UserService } from 'src/app/core/services/user.service'

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    user: User
    userSub: Subscription

    form: FormGroup

    counts: {
        attendances: number
        appointments: number
    }

    deleteConfirmationCtrl: string

    constructor(
        private authService: SocialAuthService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private snackbar: SnackbarService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.userSub = this.userService.user
            .pipe(
                debounceTime(500),
                filter(val => val.id !== '')
            )
            .subscribe(val => {
                this.user = val
                this.formHandler()
                this.countsHandler()
            })
    }

    private formHandler(): void {
        const data = this.user.attributes

        this.form = this.formBuilder.group({
            name: [{value: data.name, disabled: true}, Validators.required],
            email: [{value: data.email, disabled: true}, Validators.required],
            phone_number: [data.phoneNumber],
            address: [data.address, Validators.required],
            address_number: [data.addressNumber, Validators.required],
            zip_code: [data.zipCode, Validators.required]
        })

        if(this.user.type === 'professional') {
            this.form.addControl('register_number', new FormControl(data.registerNumber, Validators.required))
            this.form.addControl('cost_level', new FormControl(data.costLevel, Validators.required))
            this.form.addControl('observations', new FormControl(data.observations))
        }
    }

    private countsHandler(): void {
        const url = '/attendances/count'
        const payload = {
            source_id: this.user.id,
            source_type: this.user.type
        }

        this.apiService.post(url, payload).subscribe({
            next: res => {
                this.counts = {
                    appointments: res.appointments_count,
                    attendances: res.attendances_count
                }
            }
        })
    }

    submit(): void {
        const payload = {
            ...this.form.value,
            photo_url: ''
        }

        const authStateSub = this.authService.authState.pipe(take(1)).subscribe(val => {
            payload.photo_url = val.photoUrl
        })

        this.apiService.put(`/${this.user.type}s/${this.user.id}`, payload).subscribe({
            next: () => {
                this.snackbar.open('Perfil atualizado com sucesso!', 'success')
                authStateSub.unsubscribe()
                this.userService.getUser(true)
            },
            error: () => this.snackbar.open('Um erro ocorreu, tente novamente', 'error')
        })
    }

    delete(): void {
        const url = `/${this.user.type}s/${this.user.id}`

        this.apiService.delete(url).subscribe({
            next: () => {
                this.authService.signOut().then(() => {
                    this.snackbar.open('Perfil excluído com sucesso!', 'success')
                    this.dialog.closeAll()
                    this.router.navigate(['/login'])
                })
            },
            error: () => this.snackbar.open('Um erro ocorreu, tente novamente', 'error')
        })
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe()
    }
}