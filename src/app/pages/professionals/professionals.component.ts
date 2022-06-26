import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { debounceTime, map, merge, startWith, Subscription, switchMap } from 'rxjs'
import { ApiService } from 'src/app/core/services/api.service'
import { ProfessionalSum } from './interfaces/professional-sum'

@Component({
    selector: 'app-professionals',
    templateUrl: 'professionals.component.html',
    styleUrls: ['professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator
    @ViewChild('pDetails') pDetailsTemplateRef: TemplateRef<any>

    form: FormGroup

    loading: boolean = true
    professionalsCount: number = 0
    professionals: Array<ProfessionalSum> = []
    professionalsSub: Subscription
    professionalsColumns: Array<string>

    selectedProfessionalId: string

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [''],
            email: [''],
            register_number: [''],
            min_cost_level: [1],
            max_cost_level: [5]
        })

        this.professionalsColumns = [
            'id',
            'photoUrl',
            'name',
            'email',
            'registerNumber',
            'costLevel',
            'fullAddress'
        ]
    }

    ngAfterViewInit(): void {
        this.professionalsSub = merge(this.form.valueChanges, this.paginator.page)
            .pipe(
                startWith({}),
                debounceTime(500),
                switchMap(() => {
                    this.loading = true
                    const URL = `/professionals?offset=${this.paginator.pageIndex * this.paginator.pageSize}&limit=${this.paginator.pageSize}`
                    return this.apiService.get(URL)
                }),
                map(res => {
                    this.loading = false
                    this.professionalsCount = res.count

                    return res.data.map(item => {
                        const { 
                            cost_level,
                            full_address,
                            register_number,
                            photo_url,
                            observations,
                            ...otherAttributes 
                        } = item

                        return {
                            ...otherAttributes,
                            observations: observations.replace(/^(.{100}[^\s]*).*/, "$1"),
                            registerNumber: register_number,
                            costLevel: cost_level,
                            fullAddress: full_address,
                            photoUrl: photo_url
                        }
                    })
                })
            )
            .subscribe((data: Array<ProfessionalSum>) => {
                this.professionals = data
            })
    }

    openPDetails(id: string): void {
        this.selectedProfessionalId = id
        this.dialog.open(this.pDetailsTemplateRef)
    }

    ngOnDestroy(): void {
        this.professionalsSub?.unsubscribe()
    }

}