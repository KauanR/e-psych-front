import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { debounceTime, filter, map, startWith, Subscription, switchMap } from 'rxjs'
import { ApiService } from 'src/app/core/services/api.service'
import { UserService } from 'src/app/core/services/user.service'
import { UtilsService } from 'src/app/core/services/utils.service'
import { Attendance } from './interfaces/attendance'

@Component({
    selector: 'app-attendances',
    templateUrl: 'attendances.component.html',
    styleUrls: ['attendances.component.scss']
})
export class AttendancesComponent implements OnInit, AfterViewInit, OnDestroy {

    filterForm: FormGroup

    userSub: Subscription
    userType: 'patient' | 'professional'

    loading: boolean = true
    attendances: Array<Attendance>

    statusIconMap = {
        active: 'check_circle',
        inactive: 'do_not_disturb_on',
        pending: 'pending',
        rejected: 'error'
    }

    constructor(
        private userService: UserService,
        private utils: UtilsService,
        private apiService: ApiService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.filterForm = this.formBuilder.group({
            pending: [true],
            active: [true],
            inactive: [false],
            rejected: [false]
        })

        this.userSub = this.userService.user
            .pipe(debounceTime(500), filter(val => val.id !== ''))
            .subscribe(val => this.userType = val.type)
    }

    ngAfterViewInit(): void {
        this.filterForm.valueChanges
            .pipe(
                startWith(this.filterForm.value),
                debounceTime(500),
                switchMap(() => {
                    this.loading = true
                    const ACTIVE_STATUS = Object.entries(this.filterForm.value).reduce((acc, cur) => {
                        if(cur[1])
                            acc += `${cur[0]},`

                        return acc
                    }, '')

                    return this.apiService.get(`/attendances?status=${ACTIVE_STATUS.slice(0, -1)}`)
                }),
                map(res => {
                    this.loading = false

                    return res.map(el => {
                        el = this.utils.snakeToCamel(el)
                        el.professional = this.utils.snakeToCamel(el.professional)
                        el.patient = this.utils.snakeToCamel(el.patient)
                        return el
                    })
                })
            )
            .subscribe((data: Array<Attendance>) => {
                this.attendances = data
                console.log(this.attendances)
            })
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe()
    }

}