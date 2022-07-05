import { Component, Input, OnInit } from '@angular/core'
import { ApiService } from 'src/app/core/services/api.service'
import { UtilsService } from 'src/app/core/services/utils.service'
import { AADataCtrl } from './interfaces/aa-data-ctrl'

@Component({
    selector: 'app-attendance-appointments',
    templateUrl: 'a-appointments.component.html',
    styleUrls: ['a-appointments.component.scss']
})
export class AttendanceAppointmentsComponent implements OnInit {

    @Input() id: number
    @Input() status: 'active' | 'inactive' | 'pending' | 'rejected'

    dataCtrl: AADataCtrl = {
        data: [],
        error: false,
        loading: true
    }

    constructor(
        private apiService: ApiService,
        private utils: UtilsService
    ) {}

    ngOnInit(): void {
        this.loadData()
    }

    loadData(): void {
        this.dataCtrl = {
            data: [],
            error: false,
            loading: true
        }

        this.apiService.get(`/appointments/${this.id}`).subscribe({
            next: data => {
                this.dataCtrl.data = data.map(el => this.utils.snakeToCamel(el))
                this.dataCtrl.loading = false
            },
            error: () => {
                this.dataCtrl.error = true
                this.dataCtrl.loading = false
            }
        })
    }

}