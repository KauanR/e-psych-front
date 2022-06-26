import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    snakeToCamel(object: any): any {
        return Object.keys(object).reduce((acc, cur) => {
            acc[cur.replace( /([-_]\w)/g, g => g[1].toUpperCase())] = object[cur]
            return acc
        }, {})
    }

}