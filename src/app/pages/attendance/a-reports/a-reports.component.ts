import { Component, Input, OnInit } from '@angular/core'
import * as moment from 'moment'
import { ApiService } from 'src/app/core/services/api.service'
import { UtilsService } from 'src/app/core/services/utils.service'
import { ARDataCtrl } from './interfaces/ar-data-ctrl'

@Component({
    selector: 'app-attendance-reports',
    templateUrl: 'a-reports.component.html',
    styleUrls: ['a-reports.component.scss']
})
export class AttendanceReportsComponent implements OnInit {

    @Input() id: number
    @Input() status: 'active' | 'inactive' | 'pending' | 'rejected'

    dataCtrl: ARDataCtrl = {
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

        this.apiService.get(`/reports/${this.id}`).subscribe({
            next: data => {
                this.dataCtrl.data = data.map(el => {
                    this.utils.snakeToCamel(el)
                    el.createdAt = moment().format('DD/MM/YYYY, HH:mm')
                    return el
                })
                this.dataCtrl.loading = false
                console.log(this.dataCtrl)
            },
            error: () => {
                this.dataCtrl.error = true
                this.dataCtrl.loading = false
            }
        })
    }

}