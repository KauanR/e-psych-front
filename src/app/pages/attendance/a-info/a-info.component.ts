import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { User } from 'src/app/core/interfaces/user'
import { ApiService } from 'src/app/core/services/api.service'
import { SnackbarService } from 'src/app/core/services/snackbar.service'
import { Attendance } from '../interfaces/attendance'

@Component({
    selector: 'app-attendance-info',
    templateUrl: 'a-info.component.html',
    styleUrls: ['a-info.component.scss']
})
export class AttendanceInfoComponent implements OnInit, OnDestroy {

    @Input() attendance: Attendance
    @Input() user: User
    @Output() updateStatusEmitter: EventEmitter<'active' | 'inactive' | 'pending' | 'rejected'>

    statusIconMap = {
        active: 'check_circle',
        inactive: 'do_not_disturb_on',
        pending: 'pending',
        rejected: 'error'
    }

    statusNameMap = {
        active: 'Ativo',
        inactive: 'Inativo',
        pending: 'Pendente',
        rejected: 'Rejeitado'
    }

    statusForm: FormControl
    statusFormSub: Subscription

    originalStatus: 'active' | 'inactive' | 'pending' | 'rejected'
    showConfirmButton: boolean

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private snackbar: SnackbarService
    ) {
        this.updateStatusEmitter = new EventEmitter<'active' | 'inactive' | 'pending' | 'rejected'>()
    }

    ngOnInit(): void {
        this.originalStatus = `${this.attendance.status}`

        this.statusForm = this.formBuilder.control({value: this.attendance.status, disabled: this.user.type === 'patient'})

        this.statusFormSub = this.statusForm.valueChanges.subscribe(val => {
            this.showConfirmButton = val !== this.originalStatus
        })
    }

    ngOnDestroy(): void {
        this.statusFormSub.unsubscribe()
    }

    updateStatus(): void {
        const url = `/attendances/${this.attendance.id}`
        const payload = { status: this.statusForm.value }

        this.apiService.put(url, payload).subscribe({
            next: () => {
                this.snackbar.open('Status atualizado com sucesso!', 'success')
                this.originalStatus = payload.status
                this.statusForm.updateValueAndValidity()
                this.updateStatusEmitter.emit(payload.status)
            },
            error: () => {
                this.snackbar.open('Um erro ocorreu, tente novamente', 'error')
            }
        })
    }

}