import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ApiService } from 'src/app/core/services/api.service'
import { SnackbarService } from 'src/app/core/services/snackbar.service'
import { UserService } from 'src/app/core/services/user.service'
import { UtilsService } from 'src/app/core/services/utils.service'
import { ProfessionalDetails } from '../interfaces/professional-details'

@Component({
    selector: 'app-professionals-details',
    templateUrl: 'p-details.component.html',
    styleUrls: ['p-details.component.scss']
})
export class ProfessionalsDetailsComponent implements OnInit {

    @Input() id: string

    data: ProfessionalDetails

    formatedCreatedAt: string

    constructor(
        private utils: UtilsService,
        private userService: UserService,
        private apiService: ApiService,
        public dialog: MatDialog,
        private snackbar: SnackbarService
    ) {}

    ngOnInit(): void {
        this.apiService.get(`/professionals/${this.id}`).subscribe({
            next: data => {
                this.data = this.utils.snakeToCamel(data)

                const date = new Date(this.data.createdAt)
                this.formatedCreatedAt = `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getFullYear()}`
            },
            error: () => {
                setTimeout(() => {
                    this.dialog.closeAll()
                    this.snackbar.open('Um erro ocorreu, tente novamente', 'error')
                }, 1500)
            }
        })
    }

    requestAttendance(): void {
        const payload = {
            professional_id: this.data.id,
            patient_id: this.userService.user.getValue().id
        }

        this.apiService.post('/attendances', payload).subscribe({
            next: (res) => {
                if(res.message === 'This attendance is already registered') {
                    this.snackbar.open(
                        'Você já solicitou ou está sendo acompanhado por esse profissional', 
                        'info',
                        7000
                    )
                } else {
                    this.snackbar.open(
                        'Feito! Você será notificado sobre futuras atualizações', 
                        'success',
                        6000
                    )
                    setTimeout(() => this.dialog.closeAll(), 2000)
                }
            },
            error: () => {
                this.snackbar.open('Um erro ocorreu, tente novamente', 'error')
            }
        })
    }
}