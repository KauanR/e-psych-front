import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ApiService } from 'src/app/core/services/api.service'
import { SnackbarService } from 'src/app/core/services/snackbar.service'

@Component({
    selector: 'app-attendance-add',
    templateUrl: 'a-add.component.html',
    styleUrls: ['a-add.component.scss']
})
export class AttendanceAddComponent implements OnInit {

    @Input() id: number
    @Output() refreshData: EventEmitter<any> = new EventEmitter<any>()

    selected: FormControl

    appointmentForm: FormGroup
    reportForm: FormGroup

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private snacks: SnackbarService
    ) {}

    ngOnInit(): void {
        this.selected = this.formBuilder.control(0)

        this.appointmentForm = this.formBuilder.group({
            date: [new Date(), Validators.required],
            annotations: ['', Validators.required]
        })

        this.reportForm = this.formBuilder.group({
            description: ['', Validators.required]
        })
    }

    submitAppointment(): void {
        const { annotations, date } = this.appointmentForm.value
        const payload = {
            attendance_id: this.id,
            annotations,
            date: date.toISOString()
        }

        this.apiService.post('/appointments/', payload).subscribe({
            next: () => {
                this.dialog.closeAll()
                this.snacks.open('Consulta adicionada com sucesso!', 'success')
                this.refreshData.emit()
            },
            error: () => {
                this.snacks.open('Um erro ocorreu, tente novamente', 'error')
            }
        })
    }

    submitReport(): void {
        const payload = {
            attendance_id: this.id,
            ...this.reportForm.value
        }

        this.apiService.post('/reports/', payload).subscribe({
            next: () => {
                this.dialog.closeAll()
                this.snacks.open('Laudo adicionado com sucesso!', 'success')
                this.refreshData.emit()
            },
            error: () => {
                this.snacks.open('Um erro ocorreu, tente novamente', 'error')
            }
        })
    }

}