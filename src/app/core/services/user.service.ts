import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { HttpErrorResponse } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, debounceTime, filter, Subscription } from 'rxjs'
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

        this.apiService.post('/find-user', payload).subscribe({
            next: res => {
                const type = res.register_number ? 'professional' : 'patient'
                this.user.next({
                    id: res.id,
                    type,
                    attributes: {
                        name: res.name,
                        email: res.email,
                        phoneNumber: res.phone_number,
                        address: res.address,
                        addressNumber: res.address_number,
                        zipCode: res.zip_code,
                        ...(type === 'professional') && {
                            registerNumber: res.register_number,
                            costLevel: res.cost_level,
                            observations: res.observations
                        }
                    }
                })

                if(closeDialogs)
                    this.dialog.closeAll()
            },
            error: (err: HttpErrorResponse) => {
                if(err.status === 404) {
                    this.createUser()
                } else {
                    this.authService.signOut()
                    this.router.navigate(['/login'])
                    this.snackbar.open('Ocorreu um erro na autenticação, tente novamente', 'error')
                }
                
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