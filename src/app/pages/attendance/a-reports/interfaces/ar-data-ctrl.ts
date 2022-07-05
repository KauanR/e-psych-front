import { Report } from './report'

export interface ARDataCtrl {
    loading: boolean
    error: boolean
    data: Report[]
}