import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, debounceTime, Subscription } from 'rxjs'
import { User } from 'src/app/core/interfaces/user'
import { ApiService } from 'src/app/core/services/api.service'
import { UserService } from 'src/app/core/services/user.service'
import { UtilsService } from 'src/app/core/services/utils.service'
import { AttendanceAppointmentsComponent } from './a-appointments/a-appointments.component'
import { AttendanceReportsComponent } from './a-reports/a-reports.component'
import { AttendanceDataCtrl } from './interfaces/a-data-ctrl'
import { Attendance } from './interfaces/attendance'

@Component({
    selector: 'app-attendance',
    templateUrl: 'attendance.component.html',
    styleUrls: ['attendance.component.scss']
})
export class AttendanceComponent implements OnInit, OnDestroy {

    @ViewChild('appointments') appointmentsComponent: AttendanceAppointmentsComponent
    @ViewChild('reports') reportsComponent: AttendanceReportsComponent

    user: User
    sub: Subscription

    dataCtrl: AttendanceDataCtrl = {
        data: {} as Attendance,
        error: false,
        loading: true
    }

    constructor(
        private userService: UserService,
        private apiService: ApiService,
        private utils: UtilsService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.sub = combineLatest([this.userService.user, this.route.paramMap])
            .pipe(debounceTime(1000))
            .subscribe(([user, paramsMap]) => {
                this.user = user
                this.getData(Number(paramsMap.get('id')))
            })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    private async getData(id: number): Promise<void> {
        const inverted_type = this.user.type === 'patient' ? 'professional' : 'patient'
        this.apiService.get(`/attendances/${id}?add=${inverted_type}`).subscribe({
            next: data => {
                const { professional, patient, ...attributes } = data

                // Formata todo o payload pra camel case
                this.dataCtrl.data = {
                    ...this.utils.snakeToCamel(attributes),
                    related: this.utils.snakeToCamel(professional ? professional : patient)
                }

                this.dataCtrl.loading = false
            },
            error: () => {
                this.dataCtrl.error = true
                this.dataCtrl.loading = false
            }
        })
    }

    refreshData(): void {
        this.appointmentsComponent.loadData()
        this.reportsComponent.loadData()
    }

}