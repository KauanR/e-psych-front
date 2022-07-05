import { Appointment } from './appointment'

export interface AADataCtrl {
    loading: boolean
    error: boolean
    data: Appointment[]
}