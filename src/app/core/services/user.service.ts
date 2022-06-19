import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, debounceTime, filter, forkJoin, Subscription } from 'rxjs'
import { ApiService } from './api.service'
import { MatDialog } from '@angular/material/dialog'
import { RegistrationComponent } from 'src/app/shared/registration/registration.component'
import { User } from '../interfaces/user'
import { Router } from '@angular/router'
import { SnackbarService } from './snackbar.service'

const EMPTY_USER: User = {
    id: '',
    type: 'patient',
    attributes: {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        addressNumber: '',
        zipCode: '',
        registerNumber: '',
        costLevel: 0,
        observations: ''
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnDestroy {

    user: BehaviorSubject<User>

    private authUser: SocialUser
    private authStateSub: Subscription

    constructor(
        private authService: SocialAuthService,
        private apiService: ApiService,
        private dialog: MatDialog,
        private router: Router,
        private snackbar: SnackbarService
    ) {
        this.user = new BehaviorSubject<User>(EMPTY_USER)
    }

    init(): void {
        this.authStateSub = this.authService.authState
            .pipe(
                debounceTime(500),
                filter(user => user !== null && user !== undefined)
            )
            .subscribe(user => {
                this.authUser = user
                this.getUser()
            })
    }

    getUser(closeDialogs = false): void {
        const payload = {
            email: this.authUser.email
        }

        const requests = [
            this.apiService.post('/patients/find', payload),
            this.apiService.post('/professionals/find', payload)
        ]

        forkJoin(requests).subscribe({
            next: res => {
                const [patient, professional] = res

                if(Object.keys(patient).length === 0 && Object.keys(professional).length === 0)
                    this.createUser()
                
                const user = Object.keys(patient).length !== 0 ? patient : professional
                const user_type = Object.keys(patient).length !== 0 ? 'patient' : 'professional'

                this.user.next({
                    id: user.id,
                    type: user_type,
                    attributes: {
                        name: user.name,
                        email: user.email,
                        phoneNumber: user.phone_number,
                        address: user.address,
                        addressNumber: user.address_number,
                        zipCode: user.zip_code,
                        ...(user_type === 'professional') && {
                            registerNumber: user.register_number,
                            costLevel: user.cost_level,
                            observations: user.observations
                        }
                    }
                })

                if(closeDialogs)
                    this.dialog.closeAll()
            },
            error: () => {
                this.authService.signOut()
                this.router.navigate(['/login'])
                this.snackbar.open('Ocorreu um erro na autenticação, tente novamente', 'error')
            }
        })
    }

    private createUser(): void {
        this.dialog.open(
            RegistrationComponent,
            {
                disableClose: true
            }
        )
    }

    ngOnDestroy(): void {
        this.authStateSub?.unsubscribe()
    }

}